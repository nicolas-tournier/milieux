import React, { useEffect, useState, useRef, useContext } from "react";
import { Map, MapLib } from "react-map-gl";
import maplibregl from "maplibre-gl";
import DeckGL from "@deck.gl/react";
import { ScreenGridLayer } from "@deck.gl/aggregation-layers";
import { ScatterplotLayer } from "@deck.gl/layers";
import { getGeolocation } from "../utils/utils";
import { GeoPoint } from "firebase/firestore";
import { getMapData } from "../firestore/databaseTransact";
import Rbush from "rbush";
import { WebMercatorViewport } from "@deck.gl/core";
import isEqual from "lodash/isEqual";
import LoadingComponent from "./loading";
import { WebGLInitializer } from "../utils/webgl";
import { colorRange } from "../const/constants";
import { ScrollContext, UserIsScrollingContext } from "../providers/scrollContext";
import { useDebouncedCallback } from 'use-debounce';
import { MappingUpdateContext } from "../providers/mappingUpdateContext";
import { useTheme } from "../providers/themeProvider";

// const MAP_STYLE =
//   "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";
// "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
// " https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

const MAP_STYLES = {
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  // light: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
};

export default function Mapping({
  cellSize = 20,
  gpuAggregation = true,
  aggregation = "MEAN",
  pickRadius = 50,
  setCurrentHoveredGeoPoints,
}) {
  const [userGeoPoint, setUserGeoPoint] = useState<GeoPoint>(
    new GeoPoint(0, 0)
  );

  const { isReportsListScrollbar } = useContext(ScrollContext);
  const { userIsScrolling, setUserIsScrolling } = useContext(UserIsScrollingContext);

  const { theme } = useTheme();
  const mapStyle = MAP_STYLES[theme];

  useEffect(() => {
    const fetchData = async () => {
      const location = await getGeolocation();
      const geoPoint = new GeoPoint(
        location.coords.latitude,
        location.coords.longitude
      );
      setUserGeoPoint(geoPoint);
    };

    fetchData();
  }, []); // Run only once when the component mounts

  const INITIAL_VIEW_STATE = {
    longitude: userGeoPoint.longitude,
    latitude: userGeoPoint.latitude,
    zoom: 15,
    maxZoom: 15,
    pitch: 0,
    bearing: 0,
  };

  const gridLayerInit = new ScreenGridLayer({
    id: "grid",
    data: [],
    opacity: 0.95,
    getPosition: (d) => [d[0], d[1]],
    getWeight: (d) => d[2] === 0 ? 0.01 : d[2],
    colorRange: colorRange,
    colorDomain: [-1, 1],
    cellSizePixels: cellSize,
    gpuAggregation,
    aggregation,
    pickable: true
  });

  const scatterplotLayerInit = new ScatterplotLayer({
    id: "scatterplot",
    data: [{ position: [userGeoPoint.longitude, userGeoPoint.latitude] }],
    getRadius: pickRadius,
    opacity: 0.2,
    getFillColor: (d) => [255, 140, 0],
    getLineColor: (d) => [0, 0, 0],
    billboard: true,
    radiusMinPixels: pickRadius,
    radiusMaxPixels: pickRadius,
  });

  const deckRef = useRef();

  const [hoverGeoPoint, setHoverGeoPoint] = useState([
    userGeoPoint.longitude,
    userGeoPoint.latitude,
  ]);
  const [hoverCoords, setHoverCoords] = useState([0, 0]);
  const [currentViewPort, setCurrentViewPort] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    longitude: userGeoPoint.longitude,
    latitude: userGeoPoint.latitude,
    zoom: INITIAL_VIEW_STATE.zoom,
  });

  const [tree, setTree] = useState<any>(0);
  const [hoveredGeoPoints, setHoveredGeoPoints] = useState([]);

  const [gridLayer, setGridLayer] = useState(gridLayerInit);
  const { canUpdateMapping, setCanUpdateMapping } = useContext(MappingUpdateContext);

  const [scatterplotLayer, setScatterplotLayer] =
    useState(scatterplotLayerInit);

  const layersData = [gridLayer, scatterplotLayer];
  const [layers, setLayers] = useState(layersData);

  const prevFilteredGeoPoints = useRef<any[]>();

  const [mapIsInteractive, setMapIsInteractive] = useState(true);

  useEffect(() => {
    setLayers([gridLayer, scatterplotLayer]);
  }, [gridLayer, scatterplotLayer]);

  useEffect(() => {
    if (!canUpdateMapping) return;
    getMapData((newData) => {
      let _gridLayer = new ScreenGridLayer({
        ...gridLayer.props,
        data: newData,
      });
      setGridLayer(_gridLayer);
      setCanUpdateMapping(false);
    });
  }, [canUpdateMapping]);

  useEffect(() => {
    let _spLayer = new ScatterplotLayer({
      ...scatterplotLayer.props,
      data: [{ position: hoverGeoPoint }],
    });
    setScatterplotLayer(_spLayer);
  }, [hoverGeoPoint]);

  useEffect(() => {
    const fillColor = isReportsListScrollbar ? [0, 140, 255, 255] : [255, 140, 0, 255];
    let _spLayer = new ScatterplotLayer({
      ...scatterplotLayer.props,
      getFillColor: fillColor
    });
    setScatterplotLayer(_spLayer);

  }, [isReportsListScrollbar]);

  useEffect(() => {
    // if (!hoverGeoPoint) return;
    const data = gridLayer.props.data;
    if (data.length > 0) {
      const newTree = new Rbush();
      data.forEach((point, index) => {
        const bbox = {
          minX: point[0],
          maxX: point[0],
          minY: point[1],
          maxY: point[1],
          index: index,
        };
        newTree.insert(bbox);
      });
      setTree(newTree);
    }
  }, [gridLayer.props.data]);

  useEffect(() => {
    if (!isEqual(hoveredGeoPoints, prevFilteredGeoPoints.current)) {
      prevFilteredGeoPoints.current = hoveredGeoPoints;
      setCurrentHoveredGeoPoints(hoveredGeoPoints);
    }
  }, [hoveredGeoPoints]);

  useEffect(() => {
    findObjectsUnderCircle();
  }, [hoverGeoPoint, tree, currentViewPort]);

  function onHover(event) {
    setHoverCoords([event.x, event.y]);
    setHoverGeoPoint(event.coordinate);
  }

  useEffect(() => {
    setMapIsInteractive(!userIsScrolling);
  }, [userIsScrolling]);

  function handleClick(event) {

    let isScrolling = userIsScrolling;
    if (isReportsListScrollbar && !isScrolling) {
      isScrolling = true;
    } else {
      isScrolling = false;
    }

    setUserIsScrolling(isScrolling);
  }

  function findObjectsUnderCircle() {
    if (!hoverGeoPoint || !tree || !currentViewPort) return;
    const viewport = new WebMercatorViewport(currentViewPort);
    const { degreesPerUnit } = viewport.getDistanceScales();
    const currentZoom = currentViewPort.zoom;
    const scale = Math.pow(2, currentZoom);
    const radius = pickRadius / scale;
    const degreesRadiusLong = degreesPerUnit[0] * radius;
    const degreesRadiusLat = degreesPerUnit[1] * radius;

    const searchArea = {
      minX: hoverGeoPoint[0] - degreesRadiusLong,
      maxX: hoverGeoPoint[0] + degreesRadiusLat,
      minY: hoverGeoPoint[1] - degreesRadiusLong,
      maxY: hoverGeoPoint[1] + degreesRadiusLat,
    };

    if (tree) {
      const candidates = tree.search(searchArea);
      const filteredGeoPoints = candidates.map(
        (bbox) => gridLayer.props.data[bbox.index]
      );
      setHoveredGeoPoints(filteredGeoPoints);
    }
  }


  // ...

  const debouncedCallback = useDebouncedCallback(
    ({ viewState }) => {
      setCurrentViewPort({
        width: viewState.width,
        height: viewState.height,
        latitude: viewState.latitude,
        longitude: viewState.longitude,
        zoom: viewState.zoom,
      });
    }, 100);

  function onViewStateChange(viewState) {
    debouncedCallback(viewState);
  }

  if (!userGeoPoint) {
    // Loading logic, return null or a loading indicator
    return <LoadingComponent />;
  }

  return (
    <DeckGL
      className="screen-grid"
      id="deck"
      ref={deckRef}
      onClick={handleClick}
      onHover={onHover}
      layers={layers}
      initialViewState={INITIAL_VIEW_STATE}
      onWebGLInitialized={WebGLInitializer}
      onViewStateChange={onViewStateChange}
      controller={mapIsInteractive}
      preventStyleDiffing={true}
    >
      <Map reuseMaps mapLib={maplibregl as MapLib<any>} mapStyle={mapStyle} />
    </DeckGL>
  );
}

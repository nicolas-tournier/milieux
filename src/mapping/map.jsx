import React, { useEffect, useState, useRef } from 'react';
import { Map } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import DeckGL from '@deck.gl/react';
import { ScreenGridLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import { isWebGL2 } from '@luma.gl/core';
import { getGeolocation } from '../firebase/utils';
import { GeoPoint } from "firebase/firestore";
import { getMapData } from '../firestore/databaseTransact';

const userLocation = await getGeolocation();
const userGeoPoint = new GeoPoint(userLocation.coords.latitude, userLocation.coords.longitude);

const INITIAL_VIEW_STATE = {
  longitude: userGeoPoint.longitude,
  latitude: userGeoPoint.latitude,
  zoom: 15,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json';

const colorRange = [
  [255, 255, 178, 25],
  [254, 217, 118, 85],
  [254, 178, 76, 127],
  [253, 141, 60, 170],
  [240, 59, 32, 212],
  [189, 0, 38, 255]
];


export default function Mapping({
  cellSize = 20,
  gpuAggregation = true,
  aggregation = 'MEAN',
  disableGPUAggregation,
  mapStyle = MAP_STYLE,
  pickRadius = 50
}) {

  const gridLayerInit = new ScreenGridLayer({
    id: 'grid',
    data: [],
    opacity: 0.8,
    getPosition: d => [d[0], d[1]],
    getWeight: d => d[2],
    cellSizePixels: cellSize,
    colorRange,
    gpuAggregation,
    aggregation,
    pickable: true
  });

  const scatterplotLayerInit = new ScatterplotLayer({
    id: 'scatterplot',
    data: [{ position: [userGeoPoint.longitude, userGeoPoint.latitude] }],
    getRadius: pickRadius,
    opacity: 0.2,
    getFillColor: d => [255, 140, 0],
    getLineColor: d => [0, 0, 0],
    billboard: true,
    radiusMinPixels: pickRadius,
    radiusMaxPixels: pickRadius
  });

  const deckRef = useRef();

  const [objectsUnderCircle, setObjectsUnderCircle] = useState([]);
  const [hoverGeoPoint, setHoverGeoPoint] = useState([userGeoPoint.longitude, userGeoPoint.latitude]);
  const [hoverCoords, setHoverCoords] = useState([0, 0]);

  const [gridLayer, setGridLayer] = useState(gridLayerInit);
  const [canUpdateGrid, setCanUpdateGrid] = useState(true);

  const [scatterplotLayer, setScatterplotLayer] = useState(scatterplotLayerInit);
  const [canUpdateSp, setCanUpdateSp] = useState(true);

  const layersData = [gridLayer, scatterplotLayer];
  const [layers, setSLayers] = useState(layersData);

  useEffect(() => {
    setSLayers([gridLayer, scatterplotLayer]);
  }, [gridLayer, scatterplotLayer]);

  useEffect(() => {
    if (!canUpdateGrid) return;
    getMapData((newData) => {
      let _gridLayer = new ScreenGridLayer({
        ...gridLayer.props,
        data: newData
      });
      setGridLayer(_gridLayer);
    });
    setCanUpdateGrid(false);
  }, [canUpdateGrid]);

  useEffect(() => {
    let _spLayer = new ScatterplotLayer({
      ...scatterplotLayer.props,
      data: [{ position: hoverGeoPoint }]
    });
    setScatterplotLayer(_spLayer);
  }, [hoverGeoPoint]);

  function onHover(event) {
    setHoverCoords([event.x, event.y]);
    setHoverGeoPoint(event.coordinate);
    findObjectsUnderCircle();
  }

  function findObjectsUnderCircle() {
    const deckInstance = deckRef.current.deck;
    if (!deckInstance) {
      // DeckGL instance is not ready yet
      return;
    }
    const objects = deckRef.current.pickObjects({
      x: hoverCoords[0] - pickRadius,
      y: hoverCoords[1] - pickRadius,
      width: pickRadius * 2,
      height: pickRadius * 2,
      layerIds: ['grid'],
    });

    console.log('! ', objects);

    const filteredObjects = objects.filter((object) => {
      const dx = object.x - hoverCoords[0];
      const dy = object.y - hoverCoords[1];
      return dx * dx + dy * dy <= pickRadius * pickRadius;
    });

    // console.log(filteredObjects);
    setObjectsUnderCircle(filteredObjects);
  }

  const onInitialized = gl => {
    if (!isWebGL2(gl)) {
      console.warn('GPU aggregation is not supported');
      if (disableGPUAggregation) {
        disableGPUAggregation();
      }
    }
  };

  return (
    <DeckGL className="screen-grid"
      id="deck"
      ref={deckRef}
      onHover={onHover}
      layers={layers}
      initialViewState={INITIAL_VIEW_STATE}
      onWebGLInitialized={onInitialized}
      controller={true}
    >
      <Map reuseMaps mapLib={maplibregl} mapStyle={mapStyle} preventStyleDiffing={true} />
    </DeckGL>
  );
}

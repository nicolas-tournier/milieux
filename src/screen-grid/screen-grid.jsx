import React from 'react';
import { Map } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import DeckGL from '@deck.gl/react';
import { ScreenGridLayer } from '@deck.gl/aggregation-layers';
import { isWebGL2 } from '@luma.gl/core';
import { getGeolocation } from '../firebase/utils';
import { GeoPoint } from "firebase/firestore";

// Source data CSV
const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json'; // eslint-disable-line

const userLocation = await getGeolocation();
const userGeoPoint = new GeoPoint(userLocation.coords.latitude, userLocation.coords.longitude);

const INITIAL_VIEW_STATE = {
  longitude: userGeoPoint.longitude,
  latitude: userGeoPoint.latitude,
  zoom: 10.0,
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

export default function ScreenGrid({
  data = DATA_URL,
  cellSize = 20,
  gpuAggregation = true,
  aggregation = 'MEAN',
  disableGPUAggregation,
  mapStyle = MAP_STYLE
}) {
  const layers = [
    new ScreenGridLayer({
      id: 'grid',
      data,
      opacity: 0.8,
      getPosition: d => [d[0], d[1]],
      getWeight: d => d[2],
      cellSizePixels: cellSize,
      colorRange,
      gpuAggregation,
      aggregation
    })
  ];

  const onInitialized = gl => {
    if (!isWebGL2(gl)) {
      console.warn('GPU aggregation is not supported'); // eslint-disable-line
      if (disableGPUAggregation) {
        disableGPUAggregation();
      }
    }
  };

  return (
    <DeckGL className="screen-grid"
      layers={layers}
      initialViewState={INITIAL_VIEW_STATE}
      onWebGLInitialized={onInitialized}
      controller={true}
    >
      <Map reuseMaps mapLib={maplibregl} mapStyle={mapStyle} preventStyleDiffing={true} />
    </DeckGL>
  );
}

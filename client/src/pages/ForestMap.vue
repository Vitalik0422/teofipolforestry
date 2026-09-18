<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { LMap, LPolygon, LTileLayer, LMarker, LTooltip } from '@vue-leaflet/vue-leaflet';
import type { LatLngExpression, Polygon, Map as LeafletMap } from 'leaflet';
import { computed } from 'vue';
import L from 'leaflet';

const latlangs1: LatLngExpression[] = [
  [49.728605, 26.543184],
  [49.728027, 26.543124],
  [49.727546, 26.543306],
  [49.72726, 26.542908],
  [49.727273, 26.541393],
  [49.727202, 26.541196],
  [49.726969, 26.540882],
  [49.727238, 26.541031],
  [49.727855, 26.541012],
  [49.728012, 26.540844],
  [49.728023, 26.540628],
  [49.727977, 26.540297],
  [49.728314, 26.540286],
  [49.72846, 26.541741],
];

const latlangs2: LatLngExpression[] = [
  [49.728605, 26.543184],
  [49.728027, 26.543124],
  [49.727546, 26.543306],
  [49.727569, 26.544686],
  [49.728241, 26.545086],
  [49.728714, 26.544547],
  [49.728931, 26.544196],
  [49.729023, 26.543915],
  [49.72894, 26.543247],
  [49.728815, 26.543164],
];

const latlangs3: LatLngExpression[] = [
  [49.728241, 26.545086],
  [49.727569, 26.544686],
  [49.727546, 26.543306],
  [49.72726, 26.542908],
  [49.727273, 26.541393],
  [49.727202, 26.541196],
  [49.726285, 26.540859],
  [49.725834, 26.541643],
  [49.725504, 26.54145],
  [49.725112, 26.541362],
  [49.725007, 26.541182],
  [49.724938, 26.543388],
  [49.724869, 26.544555],
  [49.725125, 26.545117],
  [49.725352, 26.545801],
  [49.7253, 26.546845],
  [49.725357, 26.547942],
  [49.725894, 26.549056],
  [49.726212, 26.549772],
  [49.72684, 26.549895],
  [49.726905, 26.550242],
  [49.727045, 26.550716],
  [49.727269, 26.550914],
  [49.727366, 26.549661],
  [49.727382, 26.549172],
  [49.726578, 26.548796],
  [49.726866, 26.546616],
  [49.727688, 26.546987],
  [49.727815, 26.545991],
  [49.728005, 26.545524],
  [49.728011, 26.545513],
];

const center = computed(() => {
  const bounds = L.latLngBounds(latlangs1 as L.LatLngExpression[]);
  const mapCenter = bounds.getCenter();
  return [mapCenter.lat, mapCenter.lng] as [number, number];
});

let polygonRef: Polygon | null = null;
const MIN_ZOOM_FOR_LABEL = 15;

function onPolygonReady(polygon: Polygon) {
  polygonRef = polygon;
  polygon.bindTooltip('Моя ділянка', {
    permanent: true,
    direction: 'center',
    interactive: false,
    className: 'polygon-label leaflet-zoom-hide',
  });
}

function onMapReady(map: LeafletMap) {
  map.on('zoomend', () => {
    if (!polygonRef) return;
    const tooltip = polygonRef.getTooltip();
    if (!tooltip) return;

    if (map.getZoom() < MIN_ZOOM_FOR_LABEL) {
      polygonRef.closeTooltip();
    } else {
      polygonRef.openTooltip();
    }
  });
}
</script>
<template>
  <l-map style="height: 700px" :zoom="13" :center="center" :max-zoom="17" @ready="onMapReady">
    <l-tile-layer
      url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    ></l-tile-layer>
  </l-map>
</template>

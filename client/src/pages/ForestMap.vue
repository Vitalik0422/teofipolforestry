<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { LMap, LPolygon, LTileLayer, LMarker, LTooltip } from '@vue-leaflet/vue-leaflet';
import type { LatLngExpression, Polygon, Map as LeafletMap } from 'leaflet';
import { computed } from 'vue';
import L from 'leaflet';

const latlangs: LatLngExpression[] = [
  [49.79285939323428, 26.437435230829024],
  [49.79403134932433, 26.438303490508357],
  [49.79468475498389, 26.438814231496185],
  [49.79528420196335, 26.439519982679375],
  [49.795728652734454, 26.440136538565998],
  [49.796592538011474, 26.441148082650386],
  [49.79724291202769, 26.44162632193993],
  [49.79767449181968, 26.44173775633976],
  [49.79836680967203, 26.44179811663832],
  [49.799056120652345, 26.441505601345288],
  [49.799517653831465, 26.441969911336397],
  [49.79996719490294, 26.442847457216644],
  [49.800245908272636, 26.443339625805084],
  [49.80034780308253, 26.44183526144058],
  [49.80046468215611, 26.441055220659152],
  [49.800326824759914, 26.43993623358142],
  [49.80010505333899, 26.43718287534109],
  [49.7998413238415, 26.436463194852553],
  [49.7998323330378, 26.43538135257831],
  [49.7999046560732, 26.434627162322077],
  [49.79932025111862, 26.433573178644227],
  [49.79713587570907, 26.431669053381327],
  [49.793843545192296, 26.42885019857133],
  [49.79341193124892, 26.429272720663743],
  [49.79351506636086, 26.429891170712505],
  [49.79320034612502, 26.43192484846408],
  [49.79268479998029, 26.435982917776755],
  [49.79269376802077, 26.437392017659533],
];

const center = computed(() => {
  const bounds = L.latLngBounds(latlangs as L.LatLngExpression[]);
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
    <l-polygon :lat-lngs="latlangs" color="red" @ready="onPolygonReady"> </l-polygon>
  </l-map>
</template>

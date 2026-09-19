<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { LMap, LPolygon, LTileLayer } from '@vue-leaflet/vue-leaflet'
import type { Map as LeafletMap, Polygon, PointTuple, LatLngExpression } from 'leaflet'
import { onMounted, ref } from 'vue'
import { getKV } from '@/api/mapService'
import type { GetKv } from '@/types/mapTypes'
const center: PointTuple = [49.7268, 26.545]
const kv = ref<GetKv[]>([])
const MIN_ZOOM_FOR_LABEL = 15
const polygons = new Set<Polygon>()
let mapRef: LeafletMap | null = null

function onPolygonReady(polygon: Polygon, vidNumber: number, kvNumber: number) {
  polygon.bindTooltip(`${vidNumber}<hr>${kvNumber}`, {
    permanent: true,
    direction: 'center',
    className: 'polygon-label polygon-label-hidden',
  })
  polygon.on('mouseover', () => {
    polygon.getTooltip()?.getElement()?.classList.add('polygon-label-hover')
    polygon.setStyle({
      color: 'green',
      fillColor: 'green',
      fillOpacity: 0.4,
      weight: 4,
    })
    polygon.bringToFront()
  })
  polygon.on('mouseout', () => {
    polygon.getTooltip()?.getElement()?.classList.remove('polygon-label-hover')
    polygon.setStyle({
      color: 'green',
      fillColor: 'green',
      fillOpacity: 0.2,
      weight: 3,
    })
  })
  polygons.add(polygon)
  if (mapRef && mapRef.getZoom() >= MIN_ZOOM_FOR_LABEL) {
    polygon.openTooltip()
    polygon.getTooltip()?.getElement()?.classList.remove('polygon-label-hidden')
  }
}

function onMapReady(map: LeafletMap) {
  mapRef = map
  const updateLabels = () => {
    for (const polygon of polygons) {
      if (map.getZoom() >= MIN_ZOOM_FOR_LABEL) {
        polygon.openTooltip()
        polygon.getTooltip()?.getElement()?.classList.remove('polygon-label-hidden')
      } else {
        polygon.getTooltip()?.getElement()?.classList.add('polygon-label-hidden')
        polygon.closeTooltip()
      }
    }
  }

  map.on('zoomend', updateLabels)
  updateLabels()
}

onMounted(async () => {
  try {
    const response = await getKV()
    kv.value = response
  } catch (error) {
    console.log(error)
  }
})
</script>
<template>
  <l-map style="height: 1000px" :zoom="13" :center="center" :max-zoom="17" @ready="onMapReady">
    <l-tile-layer
      url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />
    <template v-for="item in kv" :key="item.id">
      <l-polygon
        v-for="vid in item.vidInKv"
        :key="vid.vid_num"
        :lat-lngs="vid.coords as unknown as LatLngExpression[]"
        color="green"
        @ready="(polygon: Polygon) => onPolygonReady(polygon, vid.vid_num, item.number)"
      />
    </template>
  </l-map>
</template>

<style scoped>
:global(.polygon-label) {
  font-size: 20px;
  background: transparent;
  line-height: 0;
  text-align: center;
  border: none;
  box-shadow: none;
  padding: 0;
  font-weight: bold;
  color: #000000;
}

:global(.polygon-label::before) {
  display: none;
}
:global(.polygon-label-hover) {
  color: aliceblue;
}

:global(.polygon-label-hidden) {
  visibility: hidden;
}
</style>

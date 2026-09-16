<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
const coords = { lat: 49.84410730725136, lng: 26.411624787531085 };

const address = '"КП"Теофіпольлісвод';
const aboutText =
  'КП «ТЕОФІПОЛЬЛІСВОД» — комунальне підприємство Теофіпольської селищної ради, яке працює задля розвитку та належного утримання лісового господарства громади.';
const directions = [
  {
    directionTitle: 'Лісове господарство',
    directionText:
      'Охорона, догляд та раціональне використання лісових ресурсів. Заготівля і реалізація деревини та продукції з неї.',
  },
  {
    directionTitle: 'Теплопостачання',
    directionText:
      'Виробництво та постачання теплової енергії для закладів соціальної сфери, установ та інших споживачів громади.',
  },
  {
    directionTitle: 'Тепличне господарство',
    directionText:
      'Вирощування свіжої овочевої продукції у сучасних теплицях із використанням автоматизації та крапельного поливу.',
  },
  {
    directionTitle: 'Виробництво альтернативного палива',
    directionText:
      'Виробництво паливних пелет із деревної та рослинної сировини, а також вирощування міскантусу.',
  },
  {
    directionTitle: 'Водне господарство',
    directionText:
      'Утримання та господарське використання водного об’єкта площею 36,6 га і розвиток рибного господарства.',
  },
  {
    directionTitle: 'Енергоефективність та розвиток',
    directionText:
      'Впровадження енергоефективних рішень і використання місцевих відновлюваних ресурсів для сталого розвитку.',
  },
];
</script>
<template>
  <v-container>
    <h2 class="text-wrap">{{ aboutText }}</h2>

    <v-list class="directions-list">
      <v-list-item
        v-for="direction in directions"
        :key="direction.directionTitle"
        class="direction-item"
      >
        <v-list-item-title class="text-wrap">
          {{ direction.directionTitle }}
        </v-list-item-title>
        <v-list-item-subtitle class="text-wrap">
          {{ direction.directionText }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <h3>Контакти</h3>

    <v-row class="flex-column flex-md-row">
      <v-col cols="12" lg="6">
        <v-list>
          <v-list-item
            href="https://maps.app.goo.gl/9CyJzQBoJfMr4wjc9"
            target="_blank"
            prepend-icon="mdi-map-marker"
            title="вулиця Заводська, 3, Теофіполь, 30602"
            subtitle="Прокласти маршрут"
          />

          <v-list-item
            href="tel:+380673060235"
            prepend-icon="mdi-phone"
            title="+38 (067) 306 0235"
            subtitle="Подзвонити"
          />
          <v-list-item
            href="mailto:teoflisvod@ukr.net"
            prepend-icon="mdi-email"
            title="teoflisvod@ukr.net"
          />
        </v-list>
      </v-col>
      <v-col cols="12" lg="6"
        ><v-card>
          <l-map style="height: 400px; width: 100%" :zoom="17" :center="[coords.lat, coords.lng]">
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            ></l-tile-layer>
            <l-marker :lat-lng="[coords.lat, coords.lng]">
              <l-popup>{{ address }}</l-popup>
            </l-marker>
          </l-map>
        </v-card></v-col
      >
    </v-row>
  </v-container>
</template>

<style scoped>
.direction-item :deep(.v-list-item-title),
.direction-item :deep(.v-list-item-subtitle) {
  display: block;
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}

.direction-item {
  min-height: auto;
}

.direction-item :deep(.v-list-item__content) {
  min-width: 0;
  overflow: visible;
}
</style>

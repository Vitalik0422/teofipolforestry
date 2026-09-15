<script setup lang="ts">
const news = [
  {
    id: 1,
    newsDate: '15.09.2026',
    newsTitle: 'Висадили понад 40 тисяч сіянців дуба',
    newsPhoto: '/19717.jpg',
  },
  {
    id: 2,
    newsDate: '15.09.2026',
    newsTitle: 'Висадили понад 40 тисяч сіянців дуба',
    newsPhoto: '/19717.jpg',
  },
  {
    id: 3,
    newsDate: '15.09.2026',
    newsTitle: 'Висадили понад 40 тисяч сіянців дуба',
    newsPhoto: '/19717.jpg',
  },
];
</script>
<template>
  <v-container class="d-flex flex-column ga-16 py-16">
    <v-row><v-col class="text-label-small text-warning">03 / ОСТАННІ НОВИНИ </v-col></v-row>
    <v-row class="d-flex"
      ><v-col
        ><v-card variant="text">
          <v-card-title class="text-display-medium d-flex flex-column pa-0 text-primary"
            >Життя лісу
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      ><v-col v-for="newsItem in news" :key="newsItem.id">
        <v-card class="d-flex flex-column ga-4 pb-4">
          <v-img :src="newsItem.newsPhoto"> </v-img>
          <v-card-subtitle class="text-warning">
            {{ newsItem.newsDate }}
          </v-card-subtitle>
          <v-card-title class="text-primary">
            {{ newsItem.newsTitle }}
          </v-card-title>
        </v-card>
      </v-col></v-row
    >
  </v-container>
</template>

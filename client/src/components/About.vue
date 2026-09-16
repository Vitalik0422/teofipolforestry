<script setup lang="ts">
import AppButton from './UI/AppButton.vue';
</script>

<template>
  <v-container class="d-flex flex-column ga-16 py-16">
    <v-row><v-col class="text-label-small text-warning">01 / ПРО ПІДПРИЄМСТВО </v-col></v-row>
    <v-row class="d-flex"
      ><v-col
        ><v-card variant="text">
          <v-card-title class="text-display-medium d-flex flex-column pa-0">
            <span class="text-primary">Відповідальність, </span>
            <span class="text-secondary">що проростає.</span>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card variant="text">
          <v-card-title class="text-label-large text-wrap pa-0"
            >ДП «Теофіпольське лісове господарство» — це команда людей, які щодня працюють заради
            здорових лісів Хмельниччини.
          </v-card-title>
          <v-card-actions class="pa-0">
            <AppButton text="Про наше підприємство" variant="link"
          /></v-card-actions> </v-card></v-col
    ></v-row>
    <v-row><v-divider></v-divider></v-row>
    <v-row justify="space-between">
      <v-col cols="auto">
        <v-card variant="text">
          <v-card-title class="text-secondary">10000</v-card-title>
          <v-card-text>Гектарів лісу під опікою</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="auto"
        ><v-card variant="text">
          <v-card-title class="text-secondary">20</v-card-title>
          <v-card-text>Років досвіду</v-card-text>
        </v-card></v-col
      >
      <v-col cols="auto"
        ><v-card variant="text">
          <v-card-title class="text-secondary">100</v-card-title>
          <v-card-text>Працівників</v-card-text>
        </v-card></v-col
      >
    </v-row>
  </v-container>
</template>

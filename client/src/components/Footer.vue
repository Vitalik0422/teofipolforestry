<script setup lang="ts">
import Navigation from './Navigation.vue';
import AppButton from './UI/AppButton.vue';
</script>
<template>
  <footer class="bg-primary text-white py-6">
    <v-container>
      <v-row justify="center" class="text-center text-xl-start">
        <v-col
          class="d-flex flex-column flex-xl-row align-center align-xl-start"
          cols="12"
          md="12"
          xl="3"
          ><v-img src="../assets/logo_2.svg" width="75" max-width="75"></v-img>
          <v-card variant="text">
            <v-card-title>КП "Теофіпольлісвод"</v-card-title>
            <v-card-text class="text-secondary text-label-small">
              КОМУНАЛЬНЕ ПІДПРИЄМСВТО "ТЕОФІПОЛЬЛІСВОД" ТЕОФІПОЛЬСКОЇ СЕЛИЩНОЇ РАДИ</v-card-text
            >
          </v-card></v-col
        >

        <v-col cols="12" sm="4" xl="3"
          ><v-card variant="text" class="d-flex flex-column align-center align-xl-start">
            <v-card-title> Навігація: </v-card-title>
            <Navigation
              variant="surface"
              class="d-flex flex-column align-center align-xl-start"
            /> </v-card
        ></v-col>
        <v-col cols="12" sm="4" xl="3"
          ><v-card variant="text" class="d-flex flex-column ga-4 px-4">
            <v-card-title class="pa-0">Адреса:</v-card-title>
            <v-card-text class="pa-0 text-body-large font-weight-medium"
              >КП «Теофіпольлісвод»
            </v-card-text>
            <v-card-text class="pa-0 text-body-large font-weight-medium"
              >вулиця Заводська, 3,
            </v-card-text>
            <v-card-text class="pa-0 text-body-large font-weight-medium"
              >Теофіполь, 30602</v-card-text
            >
          </v-card></v-col
        >

        <v-col cols="12" sm="4" xl="3"
          ><v-card variant="text" class="px-4">
            <v-card-title class="pa-0">Соціальні мережі:</v-card-title>
            <AppButton
              href="https://www.facebook.com/p/%D0%9A%D0%9F-%D0%A2%D0%95%D0%9E%D0%A4%D0%86%D0%9F%D0%9E%D0%9B%D0%AC%D0%9B%D0%86%D0%A1%D0%92%D0%9E%D0%94-100083098040735/?locale=uk_UA"
              target="_blank"
              variant="nav"
              class="pa-0"
            >
              <v-icon icon="mdi-facebook" size="25" /><span class="d-block"
                >facebook</span
              ></AppButton
            >
            <v-card-text class="pa-0"> </v-card-text></v-card
        ></v-col> </v-row
    ></v-container>
  </footer>
</template>

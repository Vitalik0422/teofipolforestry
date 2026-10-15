<script lang="ts" setup>
import Header from '@/components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <v-app class="d-flex flex-column">
    <Header />
    <v-main class="d-flex flex-column flex-grow-1">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<style>
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}
</style>

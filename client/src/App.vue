<script lang="ts" setup>
import Header from '@/components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <v-app class="d-flex flex-column">
    <Header />
    <v-main class="flex-grow-1">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

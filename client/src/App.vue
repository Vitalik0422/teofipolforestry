<template>
  <v-app>
    <v-main>
      <Header />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
</script>

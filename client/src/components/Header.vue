<script setup lang="ts">
import Logo from './Logo.vue';
import Navigation from './Navigation.vue';
</script>

<template>
  <v-app-bar>
    <v-container class="d-flex align-center">
      <Logo />
      <Navigation class="d-none" />
      <v-app-bar-nav-icon class="d-xl-none" />
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import Logo from './Logo.vue';
import HeaderNavigation from './HeaderNavigation.vue';
</script>

<template>
  <v-app-bar>
    <v-container class="d-flex align-center">
      <Logo />
      <HeaderNavigation />
    </v-container>
  </v-app-bar>
</template>

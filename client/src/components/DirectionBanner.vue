<script setup lang="ts">
import AppButton from './UI/AppButton.vue';
</script>
<template>
  <v-img
    src="/coniferous-forest-mountains-natural-background.jpg"
    gradient="to right,   rgba(55, 45, 30, 0.5),
      rgba(190, 135, 70, 0.3),
      rgba(55, 45, 30, 0.4)"
    height="480"
    cover
    class="d-flex align-center"
  >
    <v-container>
      <v-card variant="text" class="d-flex flex-column ga-6">
        <v-card-title class="text-display-medium d-flex flex-column ga-0 pa-0 text-surface">
          <span>Вирощуємо ліс.</span> <span>Захищаємо Життя</span>
        </v-card-title>
        <v-card-text class="text-body-medium text-surface d-flex flex-column pa-0"
          >Від насіння до зрілого лісу — кожен етап потребує турботи, знань та поваги до
          природи.</v-card-text
        >
        <v-card-actions class="pa-0">
          <AppButton variant="link-secondary" text="Наші напрями" />
        </v-card-actions>
      </v-card>
    </v-container>
  </v-img>
</template>

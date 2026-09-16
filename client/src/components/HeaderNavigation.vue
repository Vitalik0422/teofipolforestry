<script setup lang="ts">
import AppButton from './UI/AppButton.vue';
</script>

<template>
  <AppButton to="/" class="text-primary" text="Головна" />
  <AppButton to="/about" class="text-primary" text="Про підприємство" />
  <AppButton to="/map" class="text-primary" text="Карта рубок" />
  <AppButton to="/sales" class="text-primary" text="Купити дрова" />

  <AppButton to="/news" class="text-primary" text="Новини" />
  <AppButton to="/contacts" class="text-primary" text="Контакти" />
</template>

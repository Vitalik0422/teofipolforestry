<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'surface';
  }>(),
  {
    variant: 'primary',
  },
);
import AppButton from './UI/AppButton.vue';

const navigationItems = [
  { to: '/', text: 'Головна' },
  { to: '/about', text: 'Про підприємство' },
  { to: '/map', text: 'Карта рубок' },
  { to: '/sales', text: 'Купити дрова' },
  { to: '/news', text: 'Новини' },
  { to: '/contacts', text: 'Контакти' },
];
</script>

<template>
  <nav class="header-navigation">
    <AppButton
      v-for="item in navigationItems"
      :key="item.to"
      :to="item.to"
      :class="[`text-${variant}`]"
      :text="item.text"
    />
  </nav>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string;
    variant?: 'default' | 'nav' | 'cta' | 'link' | 'link-secondary';
  }>(),
  {
    text: '',
    variant: 'nav',
  },
);
defineOptions({ inheritAttrs: false });
</script>

<template>
  <v-btn v-bind="$attrs" :class="['app-btn', `app-btn--${variant}`]" variant="plain">
    <slot>{{ text }}</slot>
  </v-btn>
</template>

<style scoped>
.app-btn {
  text-transform: none;
  font-weight: 500;
  letter-spacing: normal;
}

.app-btn:hover {
  border-bottom: 2px solid rgb(var(--v-theme-secondary));
  border-radius: 0px;
}

.app-btn--nav {
  font-size: 16px;
  opacity: 1;
}

.app-btn--link {
  border: 1px solid black;
}

.app-btn--link:hover {
  border: 1px solid rgb(var(--v-theme-secondary));
}

.app-btn--link-secondary {
  padding: 20px 30px;
  background-color: rgb(var(--v-theme-secondary));
  border-radius: 0px;
}
.app-btn--link-secondary:hover {
  border-bottom: none;
}
</style>

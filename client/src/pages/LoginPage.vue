<script setup lang="ts">
import AuthHero from '@/components/AuthHero.vue'
import LoginForm from '@/components/Auth/LoginForm.vue'
</script>
<template>
  <v-container class="login-page d-flex flex-grow-1 align-stretch">
    <AuthHero />
    <LoginForm />
  </v-container>
</template>

<style scoped>
.login-page {
  gap: 24px;
}

.login-page > :deep(section) {
  flex: 1 1 0;
  min-width: 0;
}

@media (max-width: 767px) {
  .login-page {
    flex-direction: column;
  }
}
</style>

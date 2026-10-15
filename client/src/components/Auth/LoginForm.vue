<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import AppButton from '../UI/AppButton.vue'
import type { LoginRequest } from '@/types/auth.ts'
import { useAuthStore } from '@/stores/authStore.ts'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const { handleSubmit } = useForm<LoginRequest>({
  initialValues: { login: '', password: '' },
})
const { value: loginField, errorMessage: loginError } = useField<string>(
  'login',
  (value) => !!value?.trim() || 'Введи email',
)
const { value: password, errorMessage: passwordError } = useField<string>(
  'password',
  (value) => !!value?.trim() || 'Введіть пароль',
)

const authStore = useAuthStore()
const router = useRouter()
const { isLoading } = storeToRefs(authStore)
const { login } = authStore

const submit = handleSubmit(async (formData) => {
  if (await login(formData)) {
    await router.replace('/')
  }
})
</script>
<template>
  <section class="d-flex justify-center">
    <v-form
      @submit.prevent="submit"
      class="login-form d-flex flex-grow-1 align-center justify-center w-100">
      <v-col>
        <v-row class="my-0 text-secondary"><p>Особистий кабінет</p> </v-row>
        <v-row class="text-primary mt-0"><h1>Вітаємо знову</h1> </v-row>
        <v-row class="mt-0 text-grey"
          ><p>Увійдіть, щоб продовжити роботу з порталом.</p>
        </v-row>

        <v-row>
          <v-col cols="12">
            <p>Логін</p>
            <v-text-field
              label="Введіть логін"
              v-model="loginField"
              :error-messages="loginError"
              autocomplete="username"
              variant="outlined"
              bg-color="surface" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div class="d-flex align-center justify-space-between">
              <p>Пароль</p>
              <v-btn
                type="button"
                disabled
                variant="text"
                color="primary"
                class="px-0">
                Забули пароль?
              </v-btn>
            </div>
            <v-text-field
              label="Введіть пароль"
              v-model="password"
              type="password"
              :error-messages="passwordError"
              autocomplete="current-password"
              variant="outlined"
              bg-color="surface" />
          </v-col>
        </v-row>
        <v-row>
          <AppButton
            class="w-100"
            type="submit"
            variant="submit"
            :disabled="isLoading">
            <span v-if="isLoading">Виконується вхід</span>
            <span v-else>Увійти</span></AppButton
          >
        </v-row>
      </v-col>
    </v-form>
  </section>
</template>

<style scoped>
.login-form {
  max-width: 500px;
}
</style>

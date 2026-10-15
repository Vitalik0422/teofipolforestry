<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import AppButton from '../UI/AppButton.vue'
const { handleSubmit } = useForm({
  initialValues: { email: '', password: '' },
})
const { value: login, errorMessage: loginError } = useField<string>(
  'email',
  (value) => !!value?.trim() || 'Введи email',
)
const { value: password, errorMessage: passwordError } = useField<string>(
  'password',
  (value) => !!value?.trim() || 'Введіть пароль',
)

const submit = handleSubmit((formData) => {
  console.log(formData)
})
</script>
<template>
  <section class="d-flex">
    <v-form
      @submit.prevent="submit"
      class="d-flex flex-grow-1 align-center justify-center w-100"
    >
      <v-col>
        <v-row class="my-0"><p>Особистий кабінет</p> </v-row>
        <v-row class="text-primary mt-0"><h1>Вітаємо знову</h1> </v-row>
        <v-row><p>Увійдіть, щоб продовжити роботу з порталом.</p> </v-row>

        <v-row>
          <v-col cols="12">
            <p>Логін</p>
            <v-text-field
              label="Введіть логін"
              v-model="login"
              :error-messages="loginError"
              autocomplete="username"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div class="d-flex align-center justify-space-between">
              <p>Пароль</p>
              <v-btn type="button" disabled variant="text" color="primary">
                Забули пароль?
              </v-btn>
            </div>
            <v-text-field
              label="Введіть пароль"
              v-model="password"
              type="password"
              :error-messages="passwordError"
              autocomplete="current-password"
            />
          </v-col>
        </v-row>
        <v-row>
          <AppButton class="w-100" type="submit" text="Увійти" />
        </v-row>
      </v-col>
    </v-form>
  </section>
</template>

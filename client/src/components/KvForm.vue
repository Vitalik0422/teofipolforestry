<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import AppButton from './UI/AppButton.vue'
import { isAxiosError } from 'axios'
import { createKv } from '@/api/mapService'
import { useToast } from 'vue-toastification'
const toast = useToast()
const { handleSubmit, resetForm } = useForm({
  initialValues: { kvNumber: null },
})
const { value } = useField<number>('kvNumber')
const onSubmit = handleSubmit(async ({ kvNumber }) => {
  try {
    if (kvNumber === null) return
    await createKv(Number(kvNumber))
    resetForm()
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.status === 409) toast.error('Такий квадрат вже існує')
      console.error(error.response?.data?.message ?? error.message)
      return
    }
  }
})
</script>
<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field label="Ведіть номер квадрату" v-model="value" type="number"> </v-text-field>
    <AppButton type="submit" text="Зберегти" />
  </v-form>
</template>

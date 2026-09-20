<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '@/components/UI/AppButton.vue'
import { addFiles } from '@/api/galleryService'
const MAX_COUNT = 10
const selectedFiles = ref<File[]>([])
const errors = ref<string>('')
const handleChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const files = input.files ? Array.from(input.files) : []

  if (files.length > MAX_COUNT) {
    errors.value = 'Не більше 10 файлів'
    return
  } else if (files.length > 0 && files.length <= 10) {
    selectedFiles.value = files
    if (errors.value) errors.value = ''
  }
}

const handleSubmit = async () => {
  if (selectedFiles.value.length < 1) {
    errors.value = 'Добавте хоча б один файл(масимум 10)'
  }
  await addFiles(selectedFiles.value)
}
</script>
<template>
  <v-container>
    <h2>Сервіс галареї</h2>
    <p>{{ errors }}</p>
    <v-text-field
      label="Виберіть фото для завантаження"
      type="file"
      multiple
      accept="image/*"
      @change="handleChange"
    />
    <AppButton text="Зберегти" type="submit" @click="handleSubmit" />
  </v-container>
</template>

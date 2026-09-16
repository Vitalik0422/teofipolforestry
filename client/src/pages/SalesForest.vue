<script setup lang="ts">
import { useForm, useField } from 'vee-validate';

const { handleSubmit, resetForm } = useForm({ initialValues: { name: '', phone: '' } });

const {
  value: phone,
  errorMessage,
  handleBlur,
} = useField<string>('phone', (val: unknown) => (val ? true : 'Поле обов\u02b9язкове'));

const { value: name, errorMessage: errorName, handleBlur: handleName } = useField<string>('name');
const onSubmit = handleSubmit((values) => {
  console.log('submit values:', values);
  resetForm();
});
</script>

<template>
  <v-container>
    <h2>Залишіть ваші контакти і ми з Вами зв`яжимось</h2>
    <v-form @submit.prevent="onSubmit">
      <v-text-field
        v-model="name"
        label="Ваше ім`я"
        @blur="handleName"
        :error-messages="errorName ? [errorName] : []"
      />
      <v-text-field
        v-model="phone"
        label="Ваш номер телефону"
        @blur="handleBlur"
        :error-messages="errorMessage ? [errorMessage] : []"
      />
      <v-btn type="submit" class="mt-4">Надіслати</v-btn>
    </v-form>
  </v-container>
</template>

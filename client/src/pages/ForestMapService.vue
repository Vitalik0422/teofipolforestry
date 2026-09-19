<script setup lang="ts">
import KvForm from '@/components/KvForm.vue'
import VidForm from '@/components/VidForm.vue'
import { ref } from 'vue'
const tab = ref('one')
</script>
<template>
  <<v-container>
    <v-tabs v-model="tab" color="primary">
      <v-tab value="kvform">Добавити квадрат</v-tab>
      <v-tab value="vidform">Добавити виділ</v-tab>
      <v-tab value="kvlist">Список квадратів та виділів</v-tab>
    </v-tabs>
    <KvForm v-if="tab === 'kvform'" />
    <VidForm v-if="tab === 'vidform'" />
  </v-container>
</template>

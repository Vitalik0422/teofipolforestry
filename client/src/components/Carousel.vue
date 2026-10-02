<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { getFiles } from '@/api/galleryService'
import type { Image } from '@/types/image'
import { onMounted, ref } from 'vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
const images = ref<Image[]>()

const carouselConfig = {
  itemsToShow: 2.5,
  wrapAround: true,
  autoplay: 3000,
  gap: 30,
}

onMounted(async () => {
  const response = await getFiles()
  images.value = response.data
})
</script>
<template>
  <v-container>
    <Carousel v-bind="carouselConfig">
      <Slide v-for="image in images" :key="image.id">
        <v-img :src="image.secure_url" height="500" cover> </v-img
      ></Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </v-container>
</template>

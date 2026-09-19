<script setup lang="ts">
import { getKV, updateKv } from '@/api/mapService'
import AppButton from '@/components/UI/AppButton.vue'
import type { GetKv } from '@/types/mapTypes'
import { computed, onMounted, ref } from 'vue'
import { useForm, useField } from 'vee-validate'

const { handleSubmit, resetForm } = useForm({
  initialValues: { selectedKvId: null, vid: null, coordsText: '' },
})

const { value: selectedKvId } = useField<string>('selectedKvId')
const { value: vid } = useField<number>('vid')
const { value: coordsText } = useField<string>('coordsText')
const kv = ref<GetKv[]>([])
const sortedKv = computed(() => [...kv.value].sort((first, second) => first.number - second.number))

const parseCoords = (value: string) => {
  const parseLines = (text: string): [number, number][] => {
    return text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [lat, lon] = line.split('\t').map((num) => parseFloat(num.replace(',', '.')))
        return [lat, lon] as [number, number]
      })
  }

  const parseBlock = (block: string): [number, number][] => {
    const inner = block.slice(1, -1).trim()
    return inner ? parseLines(inner) : []
  }

  const blocks = value.match(/\[[^\[\]]*\]/g)

  const parsedPolygons: [number, number][][] = blocks ? blocks.map(parseBlock) : [parseLines(value)]

  if (parsedPolygons.length <= 1) return parsedPolygons

  let filtered = parsedPolygons[0]

  for (let index = 1; index < parsedPolygons.length; index++) {
    filtered = filtered.filter((line) => {
      return !parsedPolygons[index].some(
        (lineIsland) => lineIsland[0] === line[0] && lineIsland[1] === line[1],
      )
    })
  }

  return [filtered, ...parsedPolygons.slice(1)]
}
onMounted(async () => {
  const data = await getKV()
  kv.value = data
})

const onSubmit = handleSubmit(async (data) => {
  try {
    await updateKv(selectedKvId.value, {
      vid_num: Number(vid.value),
      coords: parseCoords(coordsText.value),
    })
    resetForm()
  } catch (error) {
    console.log(error)
  }
})
</script>
<template>
  <v-form @submit.prevent="onSubmit">
    <v-select
      label="Вибрати квадрат"
      :items="sortedKv"
      item-title="number"
      item-value="id"
      v-model="selectedKvId"
    />
    <v-text-field v-model="vid" label="Введіть номер виділу" />
    <v-textarea v-model="coordsText" />
    <AppButton type="submit" variant="default" text="Зберегти" />
  </v-form>
</template>

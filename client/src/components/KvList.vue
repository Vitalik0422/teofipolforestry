<script setup lang="ts">
import { deleteVid, getKV } from '@/api/mapService'
import type { GetKv, Vid } from '@/types/mapTypes'
import { onMounted, ref } from 'vue'
import AppButton from './UI/AppButton.vue'
import { useField, useForm } from 'vee-validate'
const selectedItem = ref<Vid>()
const kvList = ref<GetKv[]>([])
const isOpenModal = ref<boolean>(false)
const { handleReset, resetForm } = useForm<Vid>({
  initialValues: {
    vid_num: selectedItem.value?.vid_num,
    coords: selectedItem.value?.coords,
  },
})

const { value: vid_number } = useField<string>('vid_num')
const { value: coords } = useField<[string, string][]>('coords')

onMounted(async () => {
  const response = await getKV()
  kvList.value = response
})

const handleOpenModal = (vid: Vid) => {
  selectedItem.value = vid
  resetForm({
    values: {
      vid_num: vid.vid_num,
      coords: vid.coords,
    },
  })
  isOpenModal.value = true
}
const handleDeleteVid = async (id: string) => {
  console.log(id)
  try {
    await deleteVid(id)
  } catch (error) {}
}
</script>
<template>
  <v-expansion-panels variant="accordion">
    <v-expansion-panel v-for="kv in kvList" :key="kv.id" :title="String(kv.number)">
      <v-expansion-panel-text>
        <v-list>
          <v-list-item
            v-for="vid in kv.vidInKv"
            :key="vid.vid_num"
            :value="vid.vid_num"
            lines="one"
          >
            <div class="vid-row">
              <span>#{{ vid.vid_num }}</span>
              <v-list-item-action class="vid-actions">
                <AppButton text="Редагувати" @click="handleOpenModal(vid)" />
                <AppButton text="Видалити" @click="handleDeleteVid(vid.id!)" />
              </v-list-item-action>
            </div>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

  <v-dialog v-model="isOpenModal" max-width="1000px">
    <v-card title="Dialog">
      <v-form>
        <v-text-field v-model="vid_number"> </v-text-field>
        <v-textarea v-model="coords"> </v-textarea>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Close Dialog" @click="isOpenModal = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.vid-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.vid-actions {
  display: flex;
  gap: 8px;
}
</style>

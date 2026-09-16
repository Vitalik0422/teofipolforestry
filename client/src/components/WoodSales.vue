<script setup lang="ts">
const actions = [
  { title: 'Придбати деревину', link: '/sales' },
  { title: 'Перевірити документи', link: '/documents' },
  { title: 'Задати питання', link: '/question' },
];
</script>

<template>
  <v-container class="d-flex flex-column ga-16 py-16">
    <v-row><v-col class="text-label-small text-warning">02 / РЕАЛІЗАЦІЯ ДЕРЕВИНИ</v-col></v-row>
    <v-row class="d-flex"
      ><v-col
        ><v-card variant="text">
          <v-card-title class="text-display-medium d-flex flex-column pa-0">
            <span class="text-primary">Прозоро. Законно. </span>
            <span class="text-secondary">Відповідально.</span>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card variant="text">
          <v-card-title class="text-label-large text-wrap pa-0"
            >Ми реалізуємо лісопродукцію відкрито та з дотриманням усіх вимог законодавства.
            Деревина має офіційне походження, а кожна партія — свій документальний слід.
          </v-card-title>
          <v-card-actions class="pa-0">
            <AppButton text="Про наше підприємство" variant="link"
          /></v-card-actions> </v-card></v-col
    ></v-row>
    <v-row><v-divider></v-divider></v-row>
    <v-row>
      <v-col>
        <v-list class="pa-0" bg-color="transparent">
          <template v-for="(action, index) in actions" :key="action.title">
            <v-list-item
              :value="action.title"
              class="py-4 px-4 px-0 text-title-large"
              lines="one"
              append-icon="mdi-arrow-top-right"
              :to="action.link"
            >
              <v-list-item-title class="text-title-large">{{ action.title }} </v-list-item-title>
              <template #prepend>
                <span class="text-secondary pr-10">{{ String(index + 1).padStart(2, '0') }}</span>
              </template>
            </v-list-item>

            <v-divider v-if="index < actions.length - 1" />
          </template>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

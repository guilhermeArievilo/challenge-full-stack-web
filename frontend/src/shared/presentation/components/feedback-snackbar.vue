<template>
  <v-snackbar
    v-model="open"
    :vertical="status === 'error'"
    :color="color"
    variant="tonal"
    rounded="xl"
  >
    <h3 v-if="status === 'error'">Erro:</h3>
    <p>{{ text }}</p>

    <template v-slot:actions>
      <v-btn variant="text" @click="open = false"> Fechar </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const { text, status } = defineProps<{
  text: string
  status: 'success' | 'error' | 'warning' | 'info'
}>()
const open = defineModel<boolean | undefined>()
const color = ref('surfaceContainerLow')

watch(
  () => status,
  (val) => {
    switch (val) {
      case 'success':
        color.value = 'secondaryContainer'
        break
      case 'error':
        color.value = 'error'
        break
      case 'warning':
        color.value = 'tertiaryContainer'
        break
      default:
        color.value = 'surfaceContainerLow'
        break
    }
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped></style>

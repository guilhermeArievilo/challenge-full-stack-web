<template>
  <v-dialog persistent max-width="500" v-model="open">
    <v-card
      class="rounded-xl"
      :title="`Excluir Registro do Aluno: ${student.name}`"
      text="Deseja realmente excluir o registro deste aluno? Essa ação é irreversível."
    >
      <template #actions>
        <v-spacer></v-spacer>

        <v-btn @click="onCancel"> Cancelar </v-btn>

        <v-btn color="error" @click="onContinue"> Continuar </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Student } from '../../domain/entity/student'

const { student } = defineProps<{ student: Student }>()
const open = defineModel<boolean | undefined>()
const emit = defineEmits<{
  (e: 'continue', id: string): void
}>()

function onCancel() {
  open.value = false
}

function onContinue() {
  emit('continue', student.id)
  open.value = false
}
</script>

<style scoped></style>

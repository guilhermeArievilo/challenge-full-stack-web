<template>
  <div class="d-flex flex-column ga-4 py-4">
    <h1 class="text-h2">Consulta de alunos</h1>
    <div class="w-full d-flex ga-12 justify-content-between align-items-center">
      <v-text-field
        label="Pesquise por um aluno"
        placeholder="Digite sua busca"
        type="password"
        variant="solo"
        rounded="xl"
        append-inner-icon="mdi-magnify"
      />
      <primary-button size="x-large" prepend-icon="mdi-plus">Cadastrar Aluno</primary-button>
    </div>
    <v-data-table-server
      v-if="studentsResult"
      :items-per-page="5"
      :headers="headers"
      :items="studentsResult.data"
      :items-length="studentsResult.total"
      :loading="loading"
      item-value="name"
      @update:options="loadStudents"
    ></v-data-table-server>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject } from 'vue'
import {
  CreateStudentDTO,
  PaginatedFindStudentsResponse,
} from '../../domain/repository/students-repository'
import { StudentContainer } from '../../di/students-container'

const studentsServiceContiner = inject<StudentContainer>('student')
const studentsResult = ref<PaginatedFindStudentsResponse | null>(null)
const loading = ref(false)

const headers = [
  { title: 'Registro Acadêmico', align: 'start', key: 'ra' },
  { title: 'Nome', align: 'end', key: 'name' },
  { title: 'CPF', align: 'end', key: 'cpf' },
  // { title: "Actions", align: 'end', key: 'id' },
]

async function loadStudents({
  page,
  itemsPerPage,
  sortBy,
}: {
  page: number
  itemsPerPage: number
  sortBy: keyof CreateStudentDTO
}) {
  try {
    loading.value = true
    const res = await studentsServiceContiner.findStudents.execute({
      page,
      limit: itemsPerPage,
      orderBy: sortBy,
    })
    debugger
    studentsResult.value = res
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadStudents({
    page: 1,
    itemsPerPage: 5,
    sortBy: 'name',
  })
})
</script>

<style scoped>
.w-full {
  width: 100%;
}
</style>

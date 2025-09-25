<template>
  <div class="d-flex flex-column ga-4 py-4">
    <h1 class="text-h2">Consulta de alunos</h1>
    <div class="w-full d-flex ga-12 justify-content-between align-items-center">
      <v-text-field
        v-model="query"
        @change="onQueryChange"
        label="Pesquise por um aluno"
        placeholder="Digite sua busca"
        type="text"
        variant="solo"
        rounded="xl"
        append-inner-icon="mdi-magnify"
      />
      <primary-button
        size="x-large"
        prepend-icon="mdi-plus"
        @click="onCreateDialog"
        :disabled="disabledBtns"
        >Cadastrar Aluno</primary-button
      >
    </div>
    <v-data-table-server
      v-if="studentsResult"
      :items-per-page="itemsPerPageRef"
      :headers="headers"
      :items="studentsResult.data"
      :items-length="studentsResult.total"
      :loading="loading"
      item-value="name"
      @update:options="loadStudents"
    >
      <template #item.actions="{ item }: { item: Student }">
        <div class="d-flex ga-2 justify-end">
          <v-icon
            color="secondary"
            icon="mdi-pencil"
            size="small"
            @click="onEditDialog(item)"
          ></v-icon>

          <v-icon icon="mdi-delete" size="small" color="error" @click="onRemove(item.id)"></v-icon>
        </div>
      </template>
    </v-data-table-server>
  </div>

  <StudentDialog
    v-model="openStudentDialog"
    :student="studentOnCtx"
    @create="
      (data) => {
        onCreateStudent(data)
      }
    "
    @update="
      (data) => {
        onUpdateStudent(data.id, data)
      }
    "
  />
  <feedback-snackbar :text="feedbackMenssage" :status="feedbackStatus" v-model="openFeedback" />
</template>

<script setup lang="ts">
import { onMounted, ref, inject } from 'vue'
import type { DataTableHeader } from 'vuetify'
import StudentDialog from '../components/StudentDialog.vue'
import type { StudentContainer } from '../../di/studentContainer'
import type { Student } from '../../domain/entity/student'
import type {
  CreateStudentDTO,
  PaginatedFindStudentsResponse,
  UpdateStudentDTO,
} from '../../domain/repository/studentRepository'

const studentsServiceContiner = inject<StudentContainer>('student')
const studentsResult = ref<PaginatedFindStudentsResponse | null>(null)
const loading = ref(false)

const openStudentDialog = ref(false)
const studentOnCtx = ref<Student | undefined>(undefined)

const query = ref('')
const pageRef = ref(1)
const itemsPerPageRef = ref(5)

const feedbackMenssage = ref('')
const feedbackStatus = ref('info')
const openFeedback = ref(false)

const disabledBtns = ref(false)

const headers: DataTableHeader[] = [
  { title: 'Registro Acadêmico', align: 'start', key: 'ra' },
  { title: 'Nome', align: 'center', key: 'name' },
  { title: 'CPF', align: 'center', key: 'cpf' },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
]

function onCreateDialog() {
  studentOnCtx.value = undefined
  openStudentDialog.value = true
}

function onEditDialog(student: Student) {
  studentOnCtx.value = student
  openStudentDialog.value = true
}

async function onUpdateStudent(id: string, data: UpdateStudentDTO) {
  try {
    await studentsServiceContiner!.updateStudent.execute(id, data)
    feedbackMenssage.value = 'O registro do aluno foi atualizado com sucesso'
    feedbackStatus.value = 'success'
    await fetchStudents()
  } catch (error) {
    console.log(error)
    feedbackMenssage.value = 'Erro ao atualizar o registro do aluno'
    feedbackStatus.value = 'error'
  } finally {
    openFeedback.value = true
  }
}

async function onCreateStudent(data: CreateStudentDTO) {
  try {
    disabledBtns.value = true
    await studentsServiceContiner!.createStudent.execute(data)
    feedbackMenssage.value = 'O aluno foi registrado com sucesso'
    feedbackStatus.value = 'success'
    await fetchStudents()
  } catch (error) {
    console.log(error)
    feedbackMenssage.value = 'Erro ao cadastrar aluno'
    feedbackStatus.value = 'error'
  } finally {
    openFeedback.value = true
    disabledBtns.value = false
  }
}

async function onRemove(id: string) {
  try {
    await studentsServiceContiner!.deleteStudent.execute(id)
    feedbackMenssage.value = 'O aluno foi removido com sucesso'
    feedbackStatus.value = 'success'
    openFeedback.value = true
    await fetchStudents()
  } catch (error) {
    console.log(error)
    feedbackMenssage.value = 'Erro ao remover aluno'
    feedbackStatus.value = 'error'
    openFeedback.value = true
  }
}

async function onQueryChange() {
  await loadStudents({
    page: 1,
    itemsPerPage: itemsPerPageRef.value,
    sortBy: [{ key: 'name', order: 'asc' }],
  })
}

async function fetchStudents() {
  return await loadStudents({
    page: pageRef.value,
    itemsPerPage: itemsPerPageRef.value,
    sortBy: [{ key: 'name', order: 'asc' }],
  })
}

async function loadStudents({
  page,
  itemsPerPage,
  sortBy,
}: {
  page: number
  itemsPerPage: number
  sortBy: { key: keyof CreateStudentDTO; order: 'asc' | 'desc' }[]
}) {
  try {
    itemsPerPageRef.value = itemsPerPage
    pageRef.value = page
    loading.value = true
    const res = await studentsServiceContiner!.findStudents.execute({
      page,
      limit: itemsPerPage,
      orderBy: sortBy.length ? sortBy[0].key : 'name',
      order: sortBy.length ? sortBy[0].order : 'asc',
      query: query.value,
    })
    studentsResult.value = res
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStudents()
})
</script>

<style scoped>
.w-full {
  width: 100%;
}
</style>

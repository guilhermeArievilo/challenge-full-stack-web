<template>
  <v-dialog max-width="500" v-model="open">
    <v-card
      class="pa-3 rounded-xl"
      :title="student ? student.name : 'Cadastro de Aluno'"
      :subtitle="student ? student.ra : 'Preencha os campos abaixo'"
    >
      <template v-slot:text>
        <v-form
          ref="formRef"
          class="d-flex flex-column ga-4"
          fast-fail
          validate-on="blur"
          @submit.prevent="onSave"
        >
          <v-text-field variant="outlined" label="Nome" :rules="[requiredRule]" v-model="name" />
          <v-text-field
            v-model="ra"
            variant="outlined"
            label="RA"
            type="number"
            :disabled="!!student"
            :rules="[requiredRule, onlyNumbersRule]"
          />
          <v-text-field
            v-model="email"
            variant="outlined"
            type="email"
            label="E-mail"
            :rules="[requiredRule, emailRule]"
          />
          <v-text-field
            v-model="cpf"
            variant="outlined"
            label="CPF"
            type="text"
            placeholder="000.000.000-00"
            v-maska="'###.###.###-##'"
            data-maska-unmask="true"
            :disabled="!!student"
            :rules="[cpfRule, requiredRule]"
          />

          <v-card-actions>
            <v-btn size="x-large" @click="onCancel">Cancelar</v-btn>
            <v-spacer />
            <primary-button size="x-large" type="submit">Salvar</primary-button>
          </v-card-actions>
        </v-form>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Student } from '../../domain/entity/student'
import type {
  CreateStudentDTO,
  UpdateStudentDTO,
} from '@/features/students/domain/repository/studentRepository'
import { requiredRule, onlyNumbersRule, emailRule, cpfRule } from '@/shared/utils/rolesValidations'
const { student } = defineProps<{ student?: Student | null }>()
const open = defineModel<boolean | undefined>()
const emit = defineEmits<{
  (e: 'create', data: CreateStudentDTO): void
  (e: 'update', data: UpdateStudentDTO & { id: string }): void
}>()

const formRef = ref()

const name = ref('')
const ra = ref('')
const email = ref('')
const cpf = ref('')

async function onSave() {
  const valid = await formRef.value.isValid

  if (!valid) {
    return
  }

  if (!student) {
    emit('create', {
      name: name.value,
      ra: Number(ra.value),
      email: email.value,
      cpf: cpf.value,
    })
  } else {
    emit('update', {
      id: student.id,
      name: name.value != student.name ? name.value : undefined,
      email: email.value != student.email ? email.value : undefined,
    })
  }

  open.value = false
  name.value = ''
  ra.value = ''
  email.value = ''
  cpf.value = ''
}

function onCancel() {
  open.value = false
}

watch(
  () => student,
  (val) => {
    if (val) {
      name.value = val.name
      ra.value = String(val.ra)
      email.value = val.email
      cpf.value = val.cpf
    } else {
      name.value = ''
      ra.value = ''
      email.value = ''
      cpf.value = ''
    }
  },
  { immediate: true },
)
</script>

<template>
  <v-main class="d-flex flex-column ga-6 align-center justify-center" color="surface">
    <div>
      <img src="@/assets/grupoa_logo.png" alt="logo" width="120" />
    </div>
    <v-sheet class="pa-6" width="450" color="surfaceContainer" rounded="xl" elevation="22">
      <div class="mb-6">
        <h1 class="text-h2 text-primary text-center">Crie sua conta</h1>
        <p class="text-center text-onSurfaceVariant">Preencha os dados a seguir</p>
      </div>
      <v-form class="d-flex flex-column ga-2" fast-fail validate-on="blur" @submit.prevent>
        <v-text-field
          v-model="name"
          :rules="nameRule"
          label="Nome"
          variant="solo"
          placeholder="john"
          rounded="xl"
        />
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          variant="solo"
          placeholder="johndoe@gmail.com"
          type="email"
          rounded="xl"
        />
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Senha"
          type="password"
          variant="solo"
          rounded="xl"
        />
        <div class="d-flex flex-column ga-4">
          <PrimaryButton block size="large" type="submit">Criar conta</PrimaryButton>
          <TextButton block size="large" @click="goToLogin">Tenho uma conta</TextButton>
        </div>
      </v-form>
    </v-sheet>
  </v-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')

const nameRule = [(value: string) => !!value || 'Nome é obrigatório']
const emailRules = [
  (value: string) => !!value || 'E-mail é obrigatório',
  (value: string) => /.+@.+\..+/.test(value) || 'E-mail deve ser válido',
]
const passwordRules = [(value: string) => !!value || 'Senha é obrigatória']

function goToLogin() {
  router.push('/login')
}
</script>

<template>
  <v-main class="d-flex flex-column ga-6 align-center justify-center" color="surface">
    <div>
      <img src="@/assets/grupoa_logo.png" alt="logo" width="120" />
    </div>
    <v-sheet class="pa-6" width="420" color="surfaceContainer" rounded="xl" elevation="22">
      <div class="mb-6">
        <h1 class="text-h2 text-primary text-center">Bem vindo</h1>
        <p class="text-center text-onSurfaceVariant">Entre com seu e-mail e senha</p>
      </div>
      <v-form
        :ref="formRef"
        class="d-flex flex-column ga-2"
        fast-fail
        validate-on="blur"
        @submit.prevent="onLogin"
      >
        <v-text-field
          v-model="email"
          :rules="[requiredRule, emailRule]"
          label="E-mail"
          variant="solo"
          placeholder="johndoe@gmail.com"
          type="email"
          rounded="xl"
        />
        <v-text-field
          v-model="password"
          :rules="[requiredRule]"
          label="Senha"
          type="password"
          variant="solo"
          rounded="xl"
        />
        <div class="d-flex flex-column ga-4">
          <PrimaryButton block size="large" type="submit">Entrar</PrimaryButton>
          <text-button block size="large" @click="goToRegister">Criar conta</text-button>
        </div>
      </v-form>
    </v-sheet>
  </v-main>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { type AuthContainer } from '../../di/auth-container'
import { useRouter } from 'vue-router'
import { requiredRule, emailRule } from '@/shared/utils/rolesValidations'
const router = useRouter()
import { ref } from 'vue'

const formRef = ref()

const authServiceContainer = inject<AuthContainer>('auth')

const email = ref('')
const password = ref('')

function goToRegister() {
  router.push('/register')
}

async function onLogin() {
  const { valid } = await formRef.value.validate()

  if (!valid) {
    return
  }

  try {
    const result = await authServiceContainer!.login.execute({
      identifier: email.value,
      password: password.value,
    })
    if (result) {
      router.push('/')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

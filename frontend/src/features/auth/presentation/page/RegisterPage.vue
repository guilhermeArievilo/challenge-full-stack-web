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
      <v-form
        ref="formRef"
        class="d-flex flex-column ga-2"
        fast-fail
        validate-on="blur"
        @submit.prevent="onRegister"
      >
        <v-text-field
          v-model="name"
          :rules="[requiredRule]"
          label="Nome"
          variant="solo"
          placeholder="john"
          rounded="xl"
        />
        <v-text-field
          v-model="email"
          :rules="[emailRule, requiredRule]"
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
          <PrimaryButton block size="large" type="submit">Criar conta</PrimaryButton>
          <TextButton block size="large" @click="goToLogin">Tenho uma conta</TextButton>
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

const name = ref('')
const email = ref('')
const password = ref('')

function goToLogin() {
  router.push('/login')
}

async function onRegister() {
  const valid = await formRef.value.isValid

  if (!valid) {
    return
  }

  try {
    const result = await authServiceContainer!.register.execute({
      email: email.value,
      password: password.value,
      name: name.value,
    })

    if (result) {
      router.push('/login')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

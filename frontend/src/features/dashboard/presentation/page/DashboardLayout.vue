<template>
  <v-layout>
    <v-app-bar color="surfaceContainerLowest" elevation="0">
      <template v-slot:prepend>
        <div class="pa-4">
          <img src="@/assets/grupoa_logo.png" alt="logo" height="100%" />
        </div>
      </template>
      <template v-slot:append>
        <v-list-item prepend-avatar="@/assets/avatar.jpg" :title="user?.name || 'Buscando...'">
          <template v-slot:subtitle>
            <v-btn
              class="text-none"
              color="error"
              variant="plain"
              density="compact"
              @click="logout"
            >
              Sair
            </v-btn>
          </template>
        </v-list-item>
      </template>
    </v-app-bar>
    <v-navigation-drawer
      class="border-0 rounded-te-xl rounded-be-xl"
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      color="surfaceContainer"
    >
      <div class="h-full d-flex flex-column justify-space-between">
        <v-list density="compact" nav v-model="selectedItem">
          <v-list-subheader class="py-6">
            <h>Módulo Acadêmico</h>
          </v-list-subheader>
          <v-list-item
            class="rounded-pill"
            prepend-icon="mdi-account-school"
            title="Alunos"
            value="students"
            color="secondary"
            active
          />
        </v-list>

        <v-list>
          <v-list-item>
            <template v-if="!rail" v-slot:append>
              <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
            </template>
            <template v-else v-slot:prepend>
              <v-btn icon="mdi-chevron-right" variant="text" @click.stop="rail = !rail"></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
    <div class="pt-10 h-full w-full">
      <v-container>
        <router-view />
      </v-container>
    </div>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import type { UserContainer } from '@/features/user/di/userContainer'
import type { User } from '@/features/user/domain/entity/user'
import type { AuthContainer } from '@/features/auth/di/authContainer'

const drawer = ref(true)
const rail = ref(true)
const selectedItem = ref('students')
const user = ref<User | null>()

const userServiceContainer = inject<UserContainer>('user')
const authServiceContainer = inject<AuthContainer>('auth')

async function fetchUser() {
  try {
    const res = await userServiceContainer!.findUser.execute()
    user.value = res
  } catch (error) {
    console.log(error)
  }
}

async function logout() {
  try {
    await authServiceContainer!.logout.execute()
    window.location.href = '/login'
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchUser()
})
</script>

<style scoped>
.h-full {
  height: 100%;
}
.w-full {
  width: 100%;
}
</style>

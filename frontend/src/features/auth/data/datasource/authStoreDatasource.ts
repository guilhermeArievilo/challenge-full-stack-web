import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)

  function setToken(token: string) {
    accessToken.value = token
  }

  function clearToken() {
    accessToken.value = null
  }

  return { accessToken, setToken, clearToken }
})

export type AuthStoreDatasource = ReturnType<typeof useAuthStore>

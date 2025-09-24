<template>
  <v-layout>
    <v-app-bar color="surfaceContainerLowest" elevation="0">
      <template v-slot:prepend>
        <div class="pa-4">
          <img src="@/assets/grupoa_logo.png" alt="logo" height="100%" />
        </div>
      </template>
      <template v-slot:append>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          title="Sandra Adams"
        >
          <template v-slot:subtitle>
            <v-btn class="text-none" color="error" variant="plain" density="compact">Sair</v-btn>
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
            prepend-icon="mdi-home"
            title="Alunos"
            value="students"
            color="secondary"
          />
        </v-list>

        <v-list>
          <v-list-item>
            <template v-slot:append>
              <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
    <router-view />
  </v-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true)
const rail = ref(true)
const selectedItem = ref('students')
</script>

<style scoped>
.h-full {
  height: 100%;
}
</style>

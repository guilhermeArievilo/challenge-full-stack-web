<template>
  <v-app class="bg-surface">
    <router-view />
  </v-app>
</template>

<script setup lang="ts"></script>

<style scoped>
.bg-surface {
  background-color: var(--v-theme-surface);
}
</style>

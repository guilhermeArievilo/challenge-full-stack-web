import '@fontsource/roboto/100.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import vuetify from './core/plugins/vuetify/vuetify'
import { createAuthContainer } from './features/auth/di/auth-container'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

const authContainer = createAuthContainer()
app.provide('auth', authContainer)

app.mount('#app')

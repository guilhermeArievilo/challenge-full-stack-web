import '@fontsource/roboto/100.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import 'vuetify/styles'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vMaska } from 'maska/vue'

import App from './App.vue'
import router from './router'

import vuetify from './core/plugins/vuetify/vuetify'
import { createAuthContainer } from './features/auth/di/authContainer'
import { createStudentContainer } from './features/students/di/studentContainer'
import { createUserContainer } from './features/user/di/userContainer'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.directive('maska', vMaska)

const authContainer = createAuthContainer()
const userContainer = createUserContainer()
const studentContainer = createStudentContainer()
app.provide('auth', authContainer)
app.provide('student', studentContainer)
app.provide('user', userContainer)

app.mount('#app')

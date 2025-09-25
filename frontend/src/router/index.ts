import { useAuthStore } from '@/features/auth/data/datasource/auth-store-datasource'
import type { AuthContainer } from '@/features/auth/di/auth-container'
import LoginPage from '@/features/auth/presentation/page/loginPage.vue'
import RegisterPage from '@/features/auth/presentation/page/RegisterPage.vue'
import DashboardLayout from '@/features/dashboard/presentation/page/DashboardLayout.vue'
import StudentsPage from '@/features/students/presentation/pages/StudentsPage.vue'
import { inject } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage,
    },
    {
      path: '/',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: StudentsPage,
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (!authStore.accessToken) {
    const authContainer = inject<AuthContainer>('auth')
    await authContainer?.refresh.execute()
  }

  if (to.meta.requiresAuth && !authStore.accessToken) {
    next('/login')
  } else {
    next()
  }
})

export default router

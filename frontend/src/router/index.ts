import type { AuthContainer } from '@/features/auth/di/authContainer'
import LoginPage from '@/features/auth/presentation/page/LoginPage.vue'
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
      meta: { guestOnly: true },
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage,
      meta: { guestOnly: true },
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

router.beforeEach(async (to) => {
  const authContainer = inject<AuthContainer>('auth')

  if (to.meta.requiresAuth) {
    const authenticated = await authContainer!.refresh.execute()
    if (!authenticated) {
      return '/login'
    }

    return true
  }

  if (to.meta.guestOnly) {
    const authenticated = await authContainer!.refresh.execute()
    if (authenticated) {
      return '/'
    }

    return true
  }

  return true
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ManageView from '@/views/ManageView.vue'
import useUserStore from '@/stores/user'

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeView
  },
  {
    name: 'about',
    path: '/about',
    component: AboutView
  },
  {
    name: 'manage',
    // alias: "/manage",
    path: '/manage-music',
    component: ManageView,
    beforeEnter(to, from, next) {
      console.log('Manage Route Guard')
      next()
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/manage', // se a rota for anteradante a 'manage', redirecionar para 'manage-music'
    redirect: { name: 'manage' } // Redirecionar para a rota 'manage-music'
  },
  {
    path: '/:catchAll(.*)*', // Caso a rota não exista
    redirect: { name: 'home' } // Redirecionar para a rota home
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500' // Definir a class que deve ser adiciionada quando a rota estiver ativa
})

router.beforeEach((to, from, next) => {
  // console.log("Global Guard");

  if (!to.meta.requiresAuth) {
    next()
    return
  }

  const store = useUserStore()

  if (store.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
  }
})

export default router

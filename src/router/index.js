import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/categorys',
      name: 'categorys',
      component: () => import('../views/CategorysView.vue')
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import('../views/SignView.vue')
    }
  ]
})

export default router

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
      path: '/category',
      name: 'category',
      component: () => import('../views/AnimesCategorysView.vue')
    }
  ]
})

export default router

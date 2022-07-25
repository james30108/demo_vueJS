import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/home.vue')
    },
    {
      path: '/product_type',
      name: 'product_type',
      component: () => import('../components/product_type/index.vue')
    },
    /*...router_ptoduct*/
  ]
})

export default router

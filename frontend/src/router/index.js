import { createRouter, createWebHistory } from 'vue-router'
import router_product from "./router_product"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/dashboard/index.vue')
    },
    {
      path: '/product_type',
      name: 'product_type',
      component: () => import('../components/product_type/index.vue')
    },
    {
      path: '/product_attribute',
      name: 'product_attribute',
      component: () => import('../components/product_attribute/index.vue')
    },
    ...router_product
  ]
})

export default router

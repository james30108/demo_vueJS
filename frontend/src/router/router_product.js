export default [
    {
        path: '/product',
        name: 'product',
        component: () => import('../components/product/index.vue')
    },
    {
        path: '/product_manage',
        name: 'product_manage',
        component: () => import('../components/product/manage.vue')
    },
]
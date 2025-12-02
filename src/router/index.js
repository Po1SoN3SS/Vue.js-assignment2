import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const routes = [
    {
        path: '/',
        name: 'all',
        component: Dashboard,
        meta: { filter: 'all' }
    },
    {
        path: '/under-21',
        name: 'under21',
        component: Dashboard,
        meta: { filter: 'under21' }
    },
    {
        path: '/over-21',
        name: 'over21',
        component: Dashboard,
        meta: { filter: 'over21' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/country/:alpha3Code',
    name: 'Country',
    props: true,
    component: () => import('../views/Country.vue')
  },
  { 
    path: '/404', 
    name:'NotFound',
    component: () => import('../views/NotFound.vue') 
  },  
  { 
    path: '/:catchAll(.*)',
    redirect: { name: 'NotFound' } 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

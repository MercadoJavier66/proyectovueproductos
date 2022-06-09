import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView')
  },
  {
    path: '/carrito',
    name: 'Carrito',
    component: () => import('../views/CarritoView')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../components/Registro')
  },
  {
    path: '/admin-productos',
    name: 'Admin',
    component: () => import('../components/AdminProductos')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

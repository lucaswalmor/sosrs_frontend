import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { authMiddleware } from '@/auth';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('@/components/cadastro/Cadastro')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/encontre-seu-pet',
    name: 'encontre-seu-pet',
    component: () => import('../views/ListaInstituicoes')
  },
  {
    path: '/encontre-seu-pet/:nome',
    name: 'instituicao',
    component: () => import('../views/Instituicao')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/admin/Dashboard'),
    beforeEnter: authMiddleware,
    children: [
      {
        path: 'cadastrar-pet',
        name: 'cadastrar-pet',
        component: () => import('@/admin/FormNovoPet')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

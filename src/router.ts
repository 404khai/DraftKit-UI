import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LoginView from './views/LoginView.vue'
import DashboardView from './views/DashboardView.vue'
import EditorView from './views/EditorView.vue'
import NewPostView from './views/NewPostView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/editor/:postId',
    name: 'editor',
    component: EditorView,
    props: true
  },
  {
    path: '/new',
    name: 'new',
    component: NewPostView
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

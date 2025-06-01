/*
 * @Autor: lh
 * @Date: 2023-01-06 11:03:20
 * @LastEditors: lh
 * @LastEditTime: 2023-01-07 16:05:10
 * @Description: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: ()=> import('@/views/index/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: ()=> import('@/views/login/index.vue')
  },
  {
    path: '/install',
    name: 'install',
    component: ()=> import('@/views/install/index.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: ()=> import('@/views/index/index.vue')
  },
  {
    path: '/permission',
    name: 'permission',
    component: ()=> import('@/views/permission/permission.vue')
  },
  {
    path: '/newlogin',
    name: 'newlogin',
    component: ()=> import('@/views/newlogin/index.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: ()=> import('@/views/setting/index.vue')
  },
  {
    path: '/exchange',
    name: 'exchange',
    component: ()=> import('@/views/exchange/index.vue')
  },
  {
    path: '/dbdetails',
    name: 'dbdetails',
    component: ()=> import('@/views/dbdetails/index.vue')
  },
  {
    path: '/openb',
    name: 'openb',
    component: ()=> import('@/views/openB/index.vue')
  },
  {
    path: '/klqbox',
    name: 'klqbox',
    component: ()=> import('@/views/klqbox/index.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  // base: process.env.BASE_URL,
  base: './',
  routes
})

export default router

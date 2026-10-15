import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.path !== from.path) {
      return { top: 0 }
    }

    return undefined
  },
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/NotFound.vue'),
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/home.vue'),
    },
    {
      path: '/sales',
      name: 'SalesForest',
      component: () => import('@/pages/SalesForest.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/pages/About.vue'),
    },
    {
      path: '/forestMap/service',
      name: 'ForestMapService',
      component: () => import('@/pages/ForestMapService.vue'),
    },
    {
      path: '/forestMap',
      name: 'ForestMap',
      component: () => import('@/pages/ForestMap.vue'),
    },
    {
      path: '/gallery/service',
      name: 'GalleryService',
      component: () => import('@/pages/GalleryService.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/LoginPage.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/pages/RegisterPage.vue'),
    },
  ],
})

export default router

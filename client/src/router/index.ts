import { createRouter, createWebHistory } from 'vue-router'
import About from '@/pages/About.vue'
import ForestMap from '@/pages/ForestMap.vue'
import ForestMapService from '@/pages/ForestMapService.vue'
import Home from '@/pages/home.vue'
import NotFound from '@/pages/NotFound.vue'
import SalesForest from '@/pages/SalesForest.vue'

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
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    {
      path: '/',
      component: Home,
    },
    { path: '/sales', component: SalesForest },
    { path: '/about', component: About },
    { path: '/forestMap/service', component: ForestMapService },
    {
      path: '/forestMap',
      component: ForestMap,
    },
  ],
})

export default router

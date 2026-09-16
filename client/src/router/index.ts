import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/home.vue';
import SalesForest from '@/pages/SalesForest.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
    },
    { path: '/sales', component: SalesForest },
  ],
});

export default router;

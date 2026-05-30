import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';
import IndexPage from '../pages/IndexPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [{ path: '', component: IndexPage }],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

export default routes;

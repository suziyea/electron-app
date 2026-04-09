import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: '首页' },
      },
    ],
  },
];

const router = createRouter({
  // Electron 中使用 hash 模式
  history: createWebHashHistory(),
  routes,
});

export default router;

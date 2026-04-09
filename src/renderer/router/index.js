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
      {
        path: 'editor',
        name: 'Editor',
        component: () => import('@/views/EditorView.vue'),
        meta: { title: '代码编辑器' },
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

<template>
  <div class="flex h-screen w-screen overflow-hidden bg-gray-50">
    <!-- 侧边栏 -->
    <aside
      :class="[
        'flex flex-col bg-white border-r border-gray-200 transition-all duration-300',
        appStore.collapsed ? 'w-16' : 'w-56',
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center h-14 px-4 border-b border-gray-200 shrink-0">
        <el-icon class="text-blue-500 text-xl shrink-0"><Monitor /></el-icon>
        <span v-if="!appStore.collapsed" class="ml-2 font-semibold text-gray-800 truncate">
          {{ appStore.title }}
        </span>
      </div>

      <!-- 导航菜单 -->
      <el-menu
        :default-active="$route.path"
        :collapse="appStore.collapsed"
        :collapse-transition="false"
        router
        class="flex-1 border-none"
      >
        <el-menu-item index="/">
          <el-icon><House /></el-icon>
          <template #title>首页</template>
        </el-menu-item>
        <el-menu-item index="/editor">
          <el-icon><Edit /></el-icon>
          <template #title>代码编辑器</template>
        </el-menu-item>
      </el-menu>

      <!-- 折叠按钮 -->
      <div class="p-3 border-t border-gray-200">
        <el-button
          :icon="appStore.collapsed ? Expand : Fold"
          circle
          size="small"
          @click="appStore.toggleSidebar"
        />
      </div>
    </aside>

    <!-- 主内容区 -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- 顶部栏 -->
      <header class="flex items-center justify-between h-14 px-6 bg-white border-b border-gray-200 shrink-0">
        <h1 class="text-base font-medium text-gray-700">{{ currentTitle }}</h1>
        <div class="flex items-center gap-2">
          <el-avatar :size="32" class="bg-blue-500">U</el-avatar>
        </div>
      </header>

      <!-- 页面内容 -->
      <main class="flex-1 overflow-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { House, Monitor, Expand, Fold, Edit } from '@element-plus/icons-vue';

const route = useRoute();
const appStore = useAppStore();

const currentTitle = computed(() => route.meta?.title || appStore.title);
</script>

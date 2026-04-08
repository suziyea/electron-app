<template>
  <div class="space-y-6">
    <!-- 欢迎卡片 -->
    <el-card shadow="never" class="border-0 bg-gradient-to-r from-blue-500 to-blue-600">
      <div class="text-white">
        <p class="text-sm opacity-80">欢迎使用</p>
        <h2 class="text-2xl font-bold mt-1">My Electron App</h2>
        <p class="text-sm opacity-70 mt-2">Vue3 + Element Plus + TailwindCSS</p>
      </div>
    </el-card>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-3 gap-4">
      <el-card
        v-for="stat in stats"
        :key="stat.label"
        shadow="never"
        class="border border-gray-100"
      >
        <div class="flex items-center gap-4">
          <div :class="['p-3 rounded-lg', stat.bgColor]">
            <el-icon :class="['text-xl', stat.iconColor]">
              <component :is="stat.icon" />
            </el-icon>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-800">{{ stat.value }}</p>
            <p class="text-sm text-gray-500">{{ stat.label }}</p>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 快速操作 -->
    <el-card shadow="never" class="border border-gray-100">
      <template #header>
        <span class="font-medium text-gray-700">快速操作</span>
      </template>
      <div class="flex gap-3">
        <el-button type="primary" :icon="Plus">新建</el-button>
        <el-button :icon="Upload">导入</el-button>
        <el-button :icon="Download">导出</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { DataLine, User, Setting, Plus, Upload, Download } from '@element-plus/icons-vue';

const stats = [
  { label: '总数据', value: '1,024', icon: DataLine, bgColor: 'bg-blue-50', iconColor: 'text-blue-500' },
  { label: '用户数', value: '256', icon: User, bgColor: 'bg-green-50', iconColor: 'text-green-500' },
  { label: '配置项', value: '48', icon: Setting, bgColor: 'bg-purple-50', iconColor: 'text-purple-500' },
];
</script>

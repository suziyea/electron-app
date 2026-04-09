<template>
  <div class="editor-view h-full flex flex-col">
    <div class="toolbar flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
      <div class="flex items-center gap-4">
        <h2 class="text-white font-semibold">代码编辑器</h2>
        <el-select v-model="currentLanguage" placeholder="选择语言" size="small" style="width: 150px">
          <el-option
            v-for="lang in languages"
            :key="lang.value"
            :label="lang.label"
            :value="lang.value"
          />
        </el-select>
        <el-select v-model="currentTheme" placeholder="选择主题" size="small" style="width: 120px">
          <el-option label="VS Dark" value="vs-dark" />
          <el-option label="VS Light" value="vs" />
          <el-option label="HC Black" value="hc-black" />
        </el-select>
      </div>
      <div class="flex items-center gap-2">
        <el-button size="small" @click="formatCode">
          <el-icon><Document /></el-icon>
          格式化
        </el-button>
        <el-button size="small" type="primary" @click="runCode">
          <el-icon><VideoPlay /></el-icon>
          运行
        </el-button>
      </div>
    </div>

    <div class="flex-1 flex">
      <div class="flex-1">
        <CodeEditor
          ref="editorRef"
          v-model="code"
          :language="currentLanguage"
          :theme="currentTheme"
          @change="onCodeChange"
        />
      </div>

      <div v-if="showOutput" class="w-80 bg-gray-900 border-l border-gray-700 flex flex-col">
        <div class="flex items-center justify-between p-3 border-b border-gray-700">
          <span class="text-gray-300 text-sm">输出</span>
          <el-button text size="small" @click="showOutput = false">
            <el-icon><Close /></el-icon>
          </el-button>
        </div>
        <div class="flex-1 p-3 overflow-auto">
          <pre class="text-sm text-gray-300 whitespace-pre-wrap">{{ output }}</pre>
        </div>
      </div>
    </div>

    <div class="status-bar flex items-center justify-between px-4 py-1 bg-gray-800 text-gray-400 text-xs border-t border-gray-700">
      <div class="flex items-center gap-4">
        <span>语言: {{ currentLanguage }}</span>
        <span>行数: {{ lineCount }}</span>
        <span>字符数: {{ charCount }}</span>
      </div>
      <div class="flex items-center gap-4">
        <span>UTF-8</span>
        <span>LF</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CodeEditor from '@/components/common/CodeEditor.vue'

const editorRef = ref(null)
const code = ref(`// 欢迎使用代码编辑器
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return {
    message: \`Welcome to Electron Code Editor\`,
    timestamp: new Date().toISOString()
  };
}

const result = greet('Developer');
console.log(result);
`)

const currentLanguage = ref('javascript')
const currentTheme = ref('vs-dark')
const showOutput = ref(false)
const output = ref('')

const languages = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JSON', value: 'json' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'C++', value: 'cpp' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'SQL', value: 'sql' }
]

const lineCount = computed(() => code.value.split('\n').length)
const charCount = computed(() => code.value.length)

const onCodeChange = (value) => {
  console.log('Code changed, length:', value.length)
}

const formatCode = () => {
  editorRef.value?.getEditor()?.getAction('editor.action.formatDocument')?.run()
}

const runCode = () => {
  showOutput.value = true
  output.value = '正在执行代码...\n\n'
  
  try {
    const logs = []
    const originalLog = console.log
    console.log = (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '))
    }
    
    const result = eval(code.value)
    console.log = originalLog
    
    output.value += logs.join('\n')
    if (result !== undefined) {
      output.value += '\n\n返回值:\n' + (typeof result === 'object' ? JSON.stringify(result, null, 2) : result)
    }
  } catch (error) {
    output.value += `错误: ${error.message}`
  }
}
</script>

<style scoped>
.editor-view {
  height: calc(100vh - 60px);
}

.status-bar {
  min-height: 24px;
}
</style>

<template>
  <div ref="editorContainer" class="code-editor"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as monaco from 'monaco-editor'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'javascript'
  },
  theme: {
    type: String,
    default: 'vs-dark'
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  fontSize: {
    type: Number,
    default: 14
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const editorContainer = ref(null)
let editor = null

onMounted(() => {
  editor = monaco.editor.create(editorContainer.value, {
    value: props.modelValue,
    language: props.language,
    theme: props.theme,
    readOnly: props.readOnly,
    fontSize: props.fontSize,
    automaticLayout: true,
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    lineNumbers: 'on',
    roundedSelection: true,
    renderLineHighlight: 'all',
    cursorBlinking: 'smooth',
    tabSize: 2,
    wordWrap: 'on',
    folding: true,
    foldingStrategy: 'indentation',
    formatOnPaste: true,
    formatOnType: true
  })

  editor.onDidChangeModelContent(() => {
    const value = editor.getValue()
    emit('update:modelValue', value)
    emit('change', value)
  })
})

watch(() => props.modelValue, (newValue) => {
  if (editor && editor.getValue() !== newValue) {
    editor.setValue(newValue)
  }
})

watch(() => props.language, (newLang) => {
  if (editor) {
    monaco.editor.setModelLanguage(editor.getModel(), newLang)
  }
})

watch(() => props.theme, (newTheme) => {
  monaco.editor.setTheme(newTheme)
})

onUnmounted(() => {
  editor?.dispose()
})

defineExpose({
  getEditor: () => editor,
  getValue: () => editor?.getValue(),
  setValue: (value) => editor?.setValue(value),
  focus: () => editor?.focus()
})
</script>

<style scoped>
.code-editor {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>

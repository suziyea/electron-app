import { contextBridge, ipcRenderer } from 'electron';

// 安全地暴露 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 示例：发送消息到主进程
  send: (channel, data) => ipcRenderer.send(channel, data),
  // 示例：接收主进程消息
  on: (channel, callback) =>
    ipcRenderer.on(channel, (_event, ...args) => callback(...args)),
  // 示例：invoke/handle 模式
  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
});

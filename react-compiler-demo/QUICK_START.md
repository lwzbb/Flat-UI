# React Compiler 快速开始指南

## 🚀 3 步快速开始

### 步骤 1: 安装依赖

```bash
cd react-compiler-demo
npm install
```

### 步骤 2: 启动开发服务器

```bash
npm run dev
```

### 步骤 3: 查看演示

打开浏览器访问 `http://localhost:5173`

## 📝 核心概念

### React Compiler 是什么？

React Compiler 是 React 19 的新特性，可以**自动优化**你的 React 组件，无需手动使用 `useMemo`、`useCallback` 等优化钩子。

### 主要优势

1. **自动优化** - 编译器自动识别并优化性能瓶颈
2. **代码简洁** - 无需写大量优化代码
3. **零开销** - 编译时优化，运行时无额外成本
4. **减少错误** - 自动管理依赖，避免依赖数组错误

## 💡 快速示例

### 传统方式（需要手动优化）

```jsx
import { useState, useMemo, useCallback } from 'react'

function MyComponent() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  // 需要手动使用 useMemo
  const expensiveValue = useMemo(() => {
    return count * 1000
  }, [count])

  // 需要手动使用 useCallback
  const handleClick = useCallback(() => {
    setCount(c => c + 1)
  }, [])

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleClick}>Count: {count}</button>
      <div>Value: {expensiveValue}</div>
    </div>
  )
}
```

### React Compiler 方式（自动优化）

```jsx
import { useState } from 'react'

function MyComponent() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  // React Compiler 自动优化，无需 useMemo
  const expensiveValue = count * 1000

  // React Compiler 自动优化，无需 useCallback
  const handleClick = () => {
    setCount(c => c + 1)
  }

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleClick}>Count: {count}</button>
      <div>Value: {expensiveValue}</div>
    </div>
  )
}
```

**代码减少了 50%+，性能自动优化！**

## 🎯 演示功能

项目包含 3 个演示组件：

1. **📝 Todo 列表** - 展示回调函数自动优化
2. **🧮 复杂计算** - 展示计算值自动缓存
3. **🔍 过滤列表** - 展示列表操作自动优化

## ⚙️ 配置说明

React Compiler 已在 `vite.config.js` 中配置：

```js
react({
  babel: {
    plugins: [
      ['babel-plugin-react-compiler', {
        compilationMode: 'infer', // 自动推断模式
      }],
    ],
  },
})
```

## 📚 更多资源

- 查看 `README.md` 获取完整文档
- 查看 `COMPARISON.md` 了解详细对比
- 访问 [React 官方文档](https://react.dev/learn/react-compiler)

## ❓ 常见问题

**Q: 需要修改现有代码吗？**  
A: 不需要！React Compiler 是向后兼容的。

**Q: 还需要 useMemo/useCallback 吗？**  
A: 大多数情况下不需要，Compiler 会自动处理。

**Q: 如何验证 Compiler 工作？**  
A: 查看控制台日志，只有依赖改变时才会重新计算。

## 🎉 开始使用

现在就开始体验 React Compiler 的强大功能吧！

```bash
npm install && npm run dev
```

# 在 Cursor 中使用 React Compiler

## 🎯 概述

这个项目展示了如何在 Cursor 中配置和使用 React Compiler。React Compiler 可以自动优化 React 组件，无需手动使用 `useMemo`、`useCallback` 等优化钩子。

## 🚀 快速开始

### 1. 安装依赖

在 Cursor 的终端中运行：

```bash
cd react-compiler-demo
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 在浏览器中查看

打开 `http://localhost:5173` 查看演示效果。

## 💡 Cursor 中的优势

### 1. AI 辅助开发

Cursor 的 AI 可以帮你：
- ✅ 理解 React Compiler 的工作原理
- ✅ 自动优化现有代码
- ✅ 生成符合 Compiler 最佳实践的代码

### 2. 代码提示

Cursor 会识别 React Compiler 配置，并提供：
- 自动补全
- 类型检查
- 性能优化建议

### 3. 实时反馈

开发时可以看到：
- Compiler 优化效果
- 性能改进提示
- 代码简化建议

## 📝 使用示例

### 在 Cursor 中创建新组件

当你创建新组件时，Cursor 会：

1. **自动识别** - 检测到 React 组件
2. **提供建议** - 建议使用 Compiler 优化
3. **自动优化** - 生成已优化的代码

### 示例对话

**你**: "创建一个计数器组件"

**Cursor**: 会生成类似这样的代码（自动优化）：

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  
  // React Compiler 自动优化，无需 useCallback
  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  
  // React Compiler 自动优化，无需 useMemo
  const doubled = count * 2
  
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <div>双倍: {doubled}</div>
    </div>
  )
}
```

## 🔧 配置说明

### Vite 配置

项目已配置好 React Compiler，在 `vite.config.js` 中：

```js
react({
  babel: {
    plugins: [
      ['babel-plugin-react-compiler', {
        compilationMode: 'infer', // 自动推断（推荐）
      }],
    ],
  },
})
```

### Cursor 设置

确保 Cursor 识别项目类型：
- 项目根目录有 `package.json`
- 已安装依赖
- TypeScript/JavaScript 文件已配置

## 🎨 演示功能

项目包含 3 个完整示例：

1. **TodoList** - 展示回调函数自动优化
2. **ExpensiveCalculation** - 展示计算值自动缓存
3. **FilteredList** - 展示列表操作自动优化

每个示例都展示了：
- ✅ 简洁的代码（无需手动优化）
- ✅ 自动性能优化
- ✅ 智能依赖追踪

## 📚 学习路径

### 初学者

1. 运行项目，查看演示效果
2. 阅读 `QUICK_START.md`
3. 查看组件代码，理解自动优化

### 进阶

1. 阅读 `COMPARISON.md` 了解详细对比
2. 修改组件，观察 Compiler 行为
3. 查看构建产物，理解优化过程

### 专家

1. 研究 Compiler 配置选项
2. 自定义优化策略
3. 集成到现有项目

## 🐛 故障排除

### 问题：Compiler 未生效

**检查清单：**
- ✅ `package.json` 中已安装 `babel-plugin-react-compiler`
- ✅ `vite.config.js` 中已配置插件
- ✅ 使用 React 19+
- ✅ 重新启动开发服务器

### 问题：构建错误

**解决方案：**
```bash
# 清理缓存
rm -rf node_modules/.vite
npm run build
```

### 问题：性能未改善

**验证方法：**
1. 打开浏览器控制台
2. 查看计算函数的日志
3. 只有依赖改变时才应该重新计算

## 💡 最佳实践

### 1. 启用 Compiler

在新项目中直接启用 React Compiler，享受自动优化。

### 2. 渐进式迁移

现有项目可以逐步迁移：
- 先在新组件中使用
- 逐步迁移旧组件
- 监控性能改进

### 3. 理解原理

虽然 Compiler 自动优化，但理解原理有助于：
- 写出更好的代码
- 调试性能问题
- 做出架构决策

## 🎉 开始使用

现在就在 Cursor 中体验 React Compiler 的强大功能：

```bash
npm install && npm run dev
```

然后打开浏览器，查看自动优化的效果！

## 📖 相关资源

- [React Compiler 官方文档](https://react.dev/learn/react-compiler)
- [项目 README](./README.md)
- [快速开始指南](./QUICK_START.md)
- [对比文档](./COMPARISON.md)

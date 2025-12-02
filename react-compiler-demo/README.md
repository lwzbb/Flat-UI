# React Compiler 演示项目

这是一个展示 React Compiler 功能的完整演示项目。React Compiler 是 React 19 引入的新特性，可以自动优化组件性能，无需手动使用 `useMemo`、`useCallback` 等优化钩子。

## 🎯 项目目标

展示 React Compiler 的核心价值：
- ✅ **自动优化** - 无需手动使用 useMemo、useCallback
- ✅ **代码简洁** - 专注于业务逻辑，而非性能优化
- ✅ **零开销** - 编译时优化，运行时无额外开销
- ✅ **减少错误** - 自动识别依赖，避免依赖数组错误

## 🚀 快速开始

### 安装依赖

```bash
cd react-compiler-demo
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 查看演示。

### 构建生产版本

```bash
npm run build
```

## 📁 项目结构

```
react-compiler-demo/
├── src/
│   ├── components/
│   │   ├── TodoList.jsx          # Todo 列表组件
│   │   ├── ExpensiveCalculation.jsx  # 复杂计算组件
│   │   └── FilteredList.jsx      # 过滤列表组件
│   ├── App.jsx                   # 主应用组件
│   ├── main.jsx                  # 入口文件
│   └── index.css                 # 全局样式
├── vite.config.js                # Vite 配置（包含 React Compiler）
├── package.json
└── README.md
```

## 🎨 演示功能

### 1. Todo 列表
- 展示自动优化的回调函数
- 无需手动使用 `useCallback`
- 自动优化的计算属性

### 2. 复杂计算
- 展示自动优化的昂贵计算
- 无需手动使用 `useMemo`
- 智能依赖识别

### 3. 过滤列表
- 展示自动优化的列表操作
- 过滤和排序自动优化
- 避免不必要的重计算

## ⚙️ React Compiler 配置

### Vite 配置

在 `vite.config.js` 中配置：

```js
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler', {
            compilationMode: 'annotation', // 或 'infer'
            runtimeModule: 'react-compiler-runtime',
          }],
        ],
      },
    }),
  ],
})
```

### 编译模式

- **`annotation`** - 需要手动标记（使用 `"use memo"` 等指令）
- **`infer`** - 自动推断（推荐，更智能）

## 📚 核心概念

### 自动优化示例

**传统方式（需要手动优化）：**
```jsx
const result = useMemo(() => {
  return expensiveCalculation(number)
}, [number])
```

**React Compiler 方式（自动优化）：**
```jsx
const result = expensiveCalculation(number)
// Compiler 自动识别依赖并优化
```

### 自动优化的内容

1. **计算值缓存** - 自动识别并缓存计算结果
2. **回调函数优化** - 自动优化事件处理函数
3. **组件记忆化** - 自动优化子组件渲染
4. **依赖追踪** - 自动识别和追踪依赖

## 🔍 如何验证 Compiler 工作

### 方法 1: 查看控制台

打开浏览器控制台，查看计算函数的日志：
- 如果 Compiler 正常工作，只有依赖改变时才会重新计算
- 如果未使用 Compiler，每次渲染都会重新计算

### 方法 2: React DevTools

使用 React DevTools Profiler：
- 查看组件渲染次数
- 验证优化是否生效

### 方法 3: 构建产物

查看构建后的代码：
```bash
npm run build
# 查看 dist/ 目录中的代码
```

## 📖 学习资源

- [React Compiler 官方文档](https://react.dev/learn/react-compiler)
- [React Compiler RFC](https://github.com/reactjs/rfcs/blob/main/text/0000-react-compiler.md)
- [babel-plugin-react-compiler](https://github.com/facebook/react/tree/main/packages/babel-plugin-react-compiler)

## 🆚 对比文档

查看 `COMPARISON.md` 了解传统方式与 React Compiler 方式的详细对比。

## 💡 最佳实践

1. **启用 Compiler** - 在新项目中直接启用
2. **渐进式迁移** - 现有项目可以逐步迁移
3. **理解原理** - 了解 Compiler 的工作原理有助于写出更好的代码
4. **性能监控** - 使用工具验证优化效果

## 🐛 常见问题

### Q: Compiler 会影响现有代码吗？
A: 不会。Compiler 是向后兼容的，现有代码可以正常工作。

### Q: 还需要手动优化吗？
A: 大多数情况下不需要。Compiler 会自动处理大部分优化场景。

### Q: 如何禁用 Compiler？
A: 从 Vite 配置中移除 babel-plugin-react-compiler 即可。

### Q: Compiler 支持所有 React 特性吗？
A: 支持大部分特性，某些边缘情况可能需要手动优化。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

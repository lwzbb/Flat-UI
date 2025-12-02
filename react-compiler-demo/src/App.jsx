import { useState } from 'react'
import TodoList from './components/TodoList'
import ExpensiveCalculation from './components/ExpensiveCalculation'
import FilteredList from './components/FilteredList'
import './App.css'

function App() {
  const [activeDemo, setActiveDemo] = useState('todos')

  return (
    <div className="app">
      <h1>⚛️ React Compiler 演示</h1>
      <p className="subtitle">
        React Compiler 自动优化组件，无需手动使用 useMemo、useCallback
      </p>

      <div className="demo-selector">
        <button 
          onClick={() => setActiveDemo('todos')}
          className={activeDemo === 'todos' ? 'active' : ''}
        >
          📝 Todo 列表
        </button>
        <button 
          onClick={() => setActiveDemo('calculation')}
          className={activeDemo === 'calculation' ? 'active' : ''}
        >
          🧮 复杂计算
        </button>
        <button 
          onClick={() => setActiveDemo('filter')}
          className={activeDemo === 'filter' ? 'active' : ''}
        >
          🔍 过滤列表
        </button>
      </div>

      <div className="demo-content">
        {activeDemo === 'todos' && <TodoList />}
        {activeDemo === 'calculation' && <ExpensiveCalculation />}
        {activeDemo === 'filter' && <FilteredList />}
      </div>

      <div className="info-card">
        <h3>💡 React Compiler 的优势</h3>
        <ul>
          <li>✅ 自动优化：无需手动使用 useMemo、useCallback</li>
          <li>✅ 减少重渲染：智能识别依赖，避免不必要的更新</li>
          <li>✅ 更简洁的代码：专注于业务逻辑，而非性能优化</li>
          <li>✅ 编译时优化：在构建时完成优化，运行时零开销</li>
        </ul>
      </div>
    </div>
  )
}

export default App

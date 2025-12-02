import { useState } from 'react'
import './TodoList.css'

/**
 * TodoList 组件 - 展示 React Compiler 自动优化
 * 
 * 传统方式需要手动使用 useCallback 来优化回调函数
 * React Compiler 会自动优化，无需手动处理
 */
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 React Compiler', completed: false },
    { id: 2, text: '优化组件性能', completed: false },
    { id: 3, text: '减少手动优化代码', completed: true },
  ])
  const [inputValue, setInputValue] = useState('')

  // React Compiler 会自动优化这些函数
  // 无需手动使用 useCallback
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
        },
      ])
      setInputValue('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // React Compiler 会自动优化这个计算
  // 无需手动使用 useMemo
  const completedCount = todos.filter((todo) => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="todo-list">
      <h2>📝 Todo 列表</h2>
      <p className="hint">
        React Compiler 自动优化回调函数和计算，无需手动使用 useCallback/useMemo
      </p>

      <div className="todo-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="输入新的 todo..."
        />
        <button onClick={addTodo}>添加</button>
      </div>

      <div className="todo-stats">
        <span>总计: {totalCount}</span>
        <span>已完成: {completedCount}</span>
        <span>未完成: {totalCount - completedCount}</span>
      </div>

      <ul className="todo-items">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className="todo-text">{todo.text}</span>
            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList

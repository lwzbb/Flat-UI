import { useState } from 'react'
import './ExpensiveCalculation.css'

/**
 * ExpensiveCalculation 组件 - 展示 React Compiler 自动优化复杂计算
 * 
 * 传统方式需要手动使用 useMemo 来缓存计算结果
 * React Compiler 会自动识别并优化，无需手动处理
 */

// 模拟一个耗时的计算函数
function expensiveCalculation(n) {
  console.log('执行复杂计算...', n)
  let result = 0
  for (let i = 0; i < n * 1000000; i++) {
    result += i
  }
  return result
}

// 生成斐波那契数列（另一个复杂计算）
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

function ExpensiveCalculation() {
  const [number, setNumber] = useState(10)
  const [fibNumber, setFibNumber] = useState(30)
  const [otherState, setOtherState] = useState(0)

  // React Compiler 会自动优化这个计算
  // 只有当 number 改变时才重新计算
  // 无需手动使用 useMemo
  const calculationResult = expensiveCalculation(number)
  
  // 另一个自动优化的计算
  const fibResult = fibonacci(fibNumber)

  return (
    <div className="expensive-calculation">
      <h2>🧮 复杂计算优化</h2>
      <p className="hint">
        React Compiler 自动缓存计算结果，只有当依赖改变时才重新计算
      </p>

      <div className="calculation-group">
        <div className="input-group">
          <label>计算数字 (n * 1,000,000 次循环):</label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            min="1"
            max="100"
          />
        </div>
        <div className="result">
          <strong>计算结果:</strong> {calculationResult.toLocaleString()}
        </div>
      </div>

      <div className="calculation-group">
        <div className="input-group">
          <label>斐波那契数列 (第 n 项):</label>
          <input
            type="number"
            value={fibNumber}
            onChange={(e) => setFibNumber(Number(e.target.value))}
            min="1"
            max="40"
          />
        </div>
        <div className="result">
          <strong>斐波那契结果:</strong> {fibResult.toLocaleString()}
        </div>
      </div>

      <div className="other-state">
        <p>其他状态（用于测试重渲染）:</p>
        <button onClick={() => setOtherState(otherState + 1)}>
          点击我 ({otherState})
        </button>
        <p className="note">
          💡 点击上面的按钮不会触发复杂计算的重算，
          因为 React Compiler 知道这些计算只依赖于 number 和 fibNumber
        </p>
      </div>
    </div>
  )
}

export default ExpensiveCalculation

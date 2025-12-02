import { useState } from 'react'
import './FilteredList.css'

/**
 * FilteredList 组件 - 展示 React Compiler 自动优化列表过滤
 * 
 * 传统方式需要手动使用 useMemo 来优化过滤结果
 * React Compiler 会自动优化，无需手动处理
 */

const ITEMS = [
  'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
  'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon',
  'Mango', 'Orange', 'Papaya', 'Quince', 'Raspberry',
  'Strawberry', 'Tangerine', 'Watermelon', 'Apricot', 'Blueberry'
]

function FilteredList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  // React Compiler 会自动优化这个过滤和排序操作
  // 只有当 searchTerm 或 sortOrder 改变时才重新计算
  // 无需手动使用 useMemo
  const filteredAndSortedItems = ITEMS
    .filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.localeCompare(b)
      } else {
        return b.localeCompare(a)
      }
    })

  const itemCount = filteredAndSortedItems.length

  return (
    <div className="filtered-list">
      <h2>🔍 过滤列表</h2>
      <p className="hint">
        React Compiler 自动优化列表过滤和排序，避免不必要的重计算
      </p>

      <div className="controls">
        <div className="input-group">
          <label>搜索:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="输入搜索关键词..."
          />
        </div>

        <div className="sort-group">
          <label>排序:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">升序 (A-Z)</option>
            <option value="desc">降序 (Z-A)</option>
          </select>
        </div>
      </div>

      <div className="stats">
        找到 <strong>{itemCount}</strong> 个项目
        {searchTerm && ` (共 ${ITEMS.length} 个)`}
      </div>

      <div className="items-grid">
        {filteredAndSortedItems.length > 0 ? (
          filteredAndSortedItems.map((item, index) => (
            <div key={item} className="item-card">
              <span className="item-index">{index + 1}</span>
              <span className="item-name">{item}</span>
            </div>
          ))
        ) : (
          <div className="no-results">
            没有找到匹配的项目
          </div>
        )}
      </div>
    </div>
  )
}

export default FilteredList

import { useState, useEffect } from 'react'

// 模拟用户数据
const mockUsers = [
  {
    id: 1,
    name: '公司领导',
    role: 'executive',
    departmentId: null,
    departmentName: null,
  },
  {
    id: 2,
    name: '资产管理部负责人',
    role: 'asset-management',
    departmentId: 1,
    departmentName: '资产管理部',
  },
  {
    id: 3,
    name: '生产部负责人',
    role: 'department',
    departmentId: 2,
    departmentName: '生产部',
  },
  {
    id: 4,
    name: '销售部负责人',
    role: 'department',
    departmentId: 3,
    departmentName: '销售部',
  },
]

export function useAuth() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // 从 localStorage 恢复用户状态
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (username, password) => {
    // 模拟登录 - 实际应该调用 API
    const foundUser = mockUsers.find(u => 
      u.name === username && password === '123456'
    )
    
    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem('user', JSON.stringify(foundUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return { user, login, logout }
}

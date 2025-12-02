import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import ExecutiveDashboard from './pages/ExecutiveDashboard'
import AssetManagementDashboard from './pages/AssetManagementDashboard'
import DepartmentDashboard from './pages/DepartmentDashboard'
import { useAuth } from './hooks/useAuth'

function App() {
  const { user, login, logout } = useAuth()

  if (!user) {
    return <Login onLogin={login} />
  }

  return (
    <Layout user={user} onLogout={logout}>
      <Routes>
        <Route path="/" element={<Navigate to={`/${user.role}`} replace />} />
        <Route 
          path="/executive" 
          element={<ExecutiveDashboard user={user} />} 
        />
        <Route 
          path="/asset-management" 
          element={<AssetManagementDashboard user={user} />} 
        />
        <Route 
          path="/department" 
          element={<DepartmentDashboard user={user} />} 
        />
      </Routes>
    </Layout>
  )
}

export default App

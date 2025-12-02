import { Layout as AntLayout, Menu, Avatar, Dropdown, Space } from 'antd'
import { 
  DashboardOutlined, 
  UserOutlined, 
  LogoutOutlined,
  BankOutlined,
  ApartmentOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import './Layout.css'

const { Header, Content, Sider } = AntLayout

const menuItems = {
  executive: [
    { key: '/executive', icon: <DashboardOutlined />, label: '公司领导层视角' },
  ],
  'asset-management': [
    { key: '/asset-management', icon: <DashboardOutlined />, label: '资产管理部视角' },
  ],
  department: [
    { key: '/department', icon: <DashboardOutlined />, label: '部门视角' },
  ],
}

export default function Layout({ children, user, onLogout }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleMenuClick = ({ key }) => {
    navigate(key)
  }

  const userMenuItems = [
    {
      key: 'user',
      label: (
        <Space>
          <UserOutlined />
          <span>{user.name}</span>
        </Space>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <Space>
          <LogoutOutlined />
          <span>退出登录</span>
        </Space>
      ),
      onClick: onLogout,
    },
  ]

  const getRoleIcon = () => {
    switch (user.role) {
      case 'executive':
        return <BankOutlined />
      case 'asset-management':
        return <ApartmentOutlined />
      case 'department':
        return <TeamOutlined />
      default:
        return <UserOutlined />
    }
  }

  return (
    <AntLayout className="app-layout">
      <Header className="app-header">
        <div className="header-left">
          <div className="logo">
            <BankOutlined style={{ fontSize: 24, color: '#1890ff' }} />
            <span className="logo-text">固定资产管理系统</span>
          </div>
        </div>
        <div className="header-right">
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space className="user-info" style={{ cursor: 'pointer' }}>
              <Avatar icon={getRoleIcon()} />
              <span>{user.name}</span>
            </Space>
          </Dropdown>
        </div>
      </Header>
      <AntLayout>
        <Sider width={200} className="app-sider">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems[user.role] || []}
            onClick={handleMenuClick}
            style={{ height: '100%', borderRight: 0 }}
          />
        </Sider>
        <Content className="app-content">
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  )
}

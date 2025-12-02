import { useState } from 'react'
import { Card, Form, Input, Button, Select, message } from 'antd'
import { UserOutlined, LockOutlined, BankOutlined } from '@ant-design/icons'
import './Login.css'

const users = [
  { name: '公司领导', role: 'executive', password: '123456' },
  { name: '资产管理部负责人', role: 'asset-management', password: '123456' },
  { name: '生产部负责人', role: 'department', password: '123456' },
  { name: '销售部负责人', role: 'department', password: '123456' },
]

export default function Login({ onLogin }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const success = onLogin(values.username, values.password)
      if (success) {
        message.success('登录成功')
      } else {
        message.error('用户名或密码错误')
      }
    } catch (error) {
      message.error('登录失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <BankOutlined className="login-icon" />
          <h1>固定资产管理系统</h1>
          <p>多层级视角资产数据展示平台</p>
        </div>
        <Card className="login-card">
          <Form
            name="login"
            onFinish={handleSubmit}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请选择用户' }]}
            >
              <Select
                placeholder="请选择登录用户"
                prefix={<UserOutlined />}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={users.map(u => ({ label: u.name, value: u.name }))}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                placeholder="密码（默认：123456）"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
          <div className="login-tips">
            <p>💡 提示：</p>
            <ul>
              {users.map((user, index) => (
                <li key={index}>
                  {user.name} - 密码: {user.password}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}

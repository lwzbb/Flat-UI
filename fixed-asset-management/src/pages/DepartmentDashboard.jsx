import { Row, Col, Card, Statistic, Table, Progress, Select } from 'antd'
import { 
  DollarOutlined, 
  BankOutlined, 
  PlusCircleOutlined,
  PieChartOutlined 
} from '@ant-design/icons'
import ReactECharts from 'echarts-for-react'
import { useState } from 'react'
import { getDepartmentStats, departments } from '../data/mockData'
import './Dashboard.css'

export default function DepartmentDashboard({ user }) {
  const [selectedDeptId, setSelectedDeptId] = useState(user.departmentId || 2)
  const stats = getDepartmentStats(selectedDeptId)
  const deptName = departments.find(d => d.id === selectedDeptId)?.name || '未知部门'

  // 资产类别占比饼图
  const categoryPieOption = {
    title: {
      text: `${deptName}资产类别占比`,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: ¥{c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '资产原值',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: '{b}\n¥{c}\n({d}%)',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
          },
        },
        data: stats.categoryStats
          .filter(cat => cat.originalValue > 0)
          .map(cat => ({
            value: cat.originalValue,
            name: cat.categoryName,
          })),
      },
    ],
  }

  // 预算执行情况柱状图
  const budgetExecutionOption = {
    title: {
      text: '预算执行情况',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: (params) => {
        let result = params[0].name + '<br/>'
        params.forEach(param => {
          result += `${param.seriesName}: ¥${formatNumber(param.value)}<br/>`
        })
        return result
      },
    },
    legend: {
      data: ['预算金额', '已使用', '剩余'],
      top: 30,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: stats.budgetExecution.map(b => b.categoryName),
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value) => formatNumber(value),
      },
    },
    series: [
      {
        name: '预算金额',
        type: 'bar',
        data: stats.budgetExecution.map(b => b.budgetAmount),
        itemStyle: {
          color: '#1890ff',
        },
      },
      {
        name: '已使用',
        type: 'bar',
        data: stats.budgetExecution.map(b => b.usedAmount),
        itemStyle: {
          color: '#52c41a',
        },
      },
      {
        name: '剩余',
        type: 'bar',
        data: stats.budgetExecution.map(b => b.remainingAmount),
        itemStyle: {
          color: '#faad14',
        },
      },
    ],
  }

  // 资产类别统计表格列
  const categoryColumns = [
    {
      title: '资产类别',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: '资产数量',
      dataIndex: 'count',
      key: 'count',
      align: 'right',
    },
    {
      title: '原值（元）',
      dataIndex: 'originalValue',
      key: 'originalValue',
      align: 'right',
      render: (value) => formatNumber(value),
    },
    {
      title: '净值（元）',
      dataIndex: 'netValue',
      key: 'netValue',
      align: 'right',
      render: (value) => formatNumber(value),
    },
    {
      title: '占比',
      dataIndex: 'percentage',
      key: 'percentage',
      align: 'right',
      render: (value) => `${value}%`,
    },
  ]

  // 预算执行表格列
  const budgetColumns = [
    {
      title: '资产类别',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: '预算金额（元）',
      dataIndex: 'budgetAmount',
      key: 'budgetAmount',
      align: 'right',
      render: (value) => formatNumber(value),
    },
    {
      title: '已使用（元）',
      dataIndex: 'usedAmount',
      key: 'usedAmount',
      align: 'right',
      render: (value) => formatNumber(value),
    },
    {
      title: '剩余（元）',
      dataIndex: 'remainingAmount',
      key: 'remainingAmount',
      align: 'right',
      render: (value) => formatNumber(value),
    },
    {
      title: '执行率',
      dataIndex: 'executionRate',
      key: 'executionRate',
      align: 'right',
      render: (value) => (
        <Progress
          percent={parseFloat(value)}
          status={parseFloat(value) > 100 ? 'exception' : 'active'}
          format={(percent) => `${percent}%`}
        />
      ),
    },
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>业务部门视角</h2>
            <p>部门资产状况及预算执行情况</p>
          </div>
          <Select
            value={selectedDeptId}
            onChange={setSelectedDeptId}
            style={{ width: 200 }}
            options={departments
              .filter(d => d.code !== 'ASSET_MGMT')
              .map(d => ({ label: d.name, value: d.id }))}
          />
        </div>
      </div>

      {/* 核心指标 */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="部门资产原值"
              value={stats.totalOriginalValue}
              prefix={<DollarOutlined />}
              formatter={(value) => formatNumber(value)}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="部门资产净值"
              value={stats.totalNetValue}
              prefix={<BankOutlined />}
              formatter={(value) => formatNumber(value)}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="当年新增资产价值"
              value={stats.newAssetsValue}
              prefix={<PlusCircleOutlined />}
              formatter={(value) => formatNumber(value)}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="预算执行率"
              value={stats.budgetExecutionRate}
              suffix="%"
              prefix={<PieChartOutlined />}
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总预算"
              value={stats.totalBudget}
              formatter={(value) => formatNumber(value)}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="已使用预算"
              value={stats.totalUsedBudget}
              formatter={(value) => formatNumber(value)}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="剩余预算"
              value={stats.totalRemainingBudget}
              formatter={(value) => formatNumber(value)}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="当年新增资产数量"
              value={stats.newAssetsCount}
            />
          </Card>
        </Col>
      </Row>

      {/* 图表 */}
      <Row gutter={[16, 16]} className="charts-row">
        <Col xs={24} lg={12}>
          <Card title="资产类别占比" className="chart-card">
            <ReactECharts
              option={categoryPieOption}
              style={{ height: '400px' }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="预算执行情况" className="chart-card">
            <ReactECharts
              option={budgetExecutionOption}
              style={{ height: '400px' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 表格 */}
      <Row gutter={[16, 16]} className="table-row">
        <Col xs={24} lg={12}>
          <Card title="资产类别统计" className="table-card">
            <Table
              columns={categoryColumns}
              dataSource={stats.categoryStats.filter(cat => cat.count > 0)}
              rowKey="categoryId"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="预算执行明细" className="table-card">
            <Table
              columns={budgetColumns}
              dataSource={stats.budgetExecution}
              rowKey="categoryName"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

// 格式化数字
function formatNumber(num) {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(2) + '亿'
  } else if (num >= 10000) {
    return (num / 10000).toFixed(2) + '万'
  }
  return num.toLocaleString()
}

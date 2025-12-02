import { Row, Col, Card, Statistic, Table } from 'antd'
import { 
  DollarOutlined, 
  BankOutlined, 
  PlusCircleOutlined,
  PieChartOutlined 
} from '@ant-design/icons'
import ReactECharts from 'echarts-for-react'
import { getCompanyStats } from '../data/mockData'
import './Dashboard.css'

export default function ExecutiveDashboard() {
  const stats = getCompanyStats()

  // 资产类别占比饼图
  const categoryPieOption = {
    title: {
      text: '资产类别占比',
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
        data: stats.categoryStats.map(cat => ({
          value: cat.originalValue,
          name: cat.categoryName,
        })),
      },
    ],
  }

  // 资产类别对比柱状图
  const categoryBarOption = {
    title: {
      text: '各资产类别价值对比',
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
      data: ['原值', '净值'],
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
      data: stats.categoryStats.map(cat => cat.categoryName),
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
        name: '原值',
        type: 'bar',
        data: stats.categoryStats.map(cat => cat.originalValue),
        itemStyle: {
          color: '#1890ff',
        },
      },
      {
        name: '净值',
        type: 'bar',
        data: stats.categoryStats.map(cat => cat.netValue),
        itemStyle: {
          color: '#52c41a',
        },
      },
    ],
  }

  // 表格列定义
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
    {
      title: '当年新增',
      dataIndex: 'newAssetsCount',
      key: 'newAssetsCount',
      align: 'right',
    },
    {
      title: '新增价值（元）',
      dataIndex: 'newAssetsValue',
      key: 'newAssetsValue',
      align: 'right',
      render: (value) => formatNumber(value),
    },
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>公司领导层视角</h2>
        <p>公司整体资产状况及预算执行情况</p>
      </div>

      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="资产原值"
              value={stats.totalOriginalValue}
              prefix={<DollarOutlined />}
              formatter={(value) => formatNumber(value)}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="资产净值"
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
              title="当年资本性支出预算"
              value={stats.totalBudget}
              prefix={<PieChartOutlined />}
              formatter={(value) => formatNumber(value)}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="预算已使用"
              value={stats.totalUsedBudget}
              formatter={(value) => formatNumber(value)}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="预算剩余"
              value={stats.totalRemainingBudget}
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
              precision={2}
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
          <Card title="资产类别价值对比" className="chart-card">
            <ReactECharts
              option={categoryBarOption}
              style={{ height: '400px' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="table-row">
        <Col xs={24}>
          <Card title="资产类别详细统计" className="table-card">
            <Table
              columns={categoryColumns}
              dataSource={stats.categoryStats}
              rowKey="categoryId"
              pagination={false}
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

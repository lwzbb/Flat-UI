import { Row, Col, Card, Statistic, Table, Tag, Alert } from 'antd'
import { 
  DollarOutlined, 
  BankOutlined, 
  PlusCircleOutlined,
  PieChartOutlined,
  ShoppingOutlined,
  WarningOutlined
} from '@ant-design/icons'
import ReactECharts from 'echarts-for-react'
import { getAssetManagementStats, purchases } from '../data/mockData'
import './Dashboard.css'

export default function AssetManagementDashboard() {
  const stats = getAssetManagementStats()
  const companyStats = stats.companyStats
  const deptStats = stats.deptStats
  const purchaseStats = stats.purchaseStats
  const pendingTasks = stats.pendingTasks

  // 公司资产类别占比饼图
  const companyCategoryPieOption = {
    title: {
      text: '公司资产类别占比',
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
        data: companyStats.categoryStats.map(cat => ({
          value: cat.originalValue,
          name: cat.categoryName,
        })),
      },
    ],
  }

  // 月度采购趋势
  const monthlyPurchaseOption = {
    title: {
      text: '月度采购趋势',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        let result = params[0].name + '<br/>'
        params.forEach(param => {
          result += `${param.seriesName}: ${param.value}<br/>`
        })
        return result
      },
    },
    legend: {
      data: ['采购数量', '采购金额'],
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
      data: stats.monthlyPurchases.map(p => p.month),
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '数量',
        position: 'left',
      },
      {
        type: 'value',
        name: '金额',
        position: 'right',
        axisLabel: {
          formatter: (value) => formatNumber(value),
        },
      },
    ],
    series: [
      {
        name: '采购数量',
        type: 'bar',
        data: stats.monthlyPurchases.map(p => p.count),
        itemStyle: {
          color: '#1890ff',
        },
      },
      {
        name: '采购金额',
        type: 'line',
        yAxisIndex: 1,
        data: stats.monthlyPurchases.map(p => p.amount),
        itemStyle: {
          color: '#52c41a',
        },
      },
    ],
  }

  // 采购状态统计表格列
  const purchaseColumns = [
    {
      title: '部门',
      dataIndex: 'departmentName',
      key: 'departmentName',
    },
    {
      title: '资产类别',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: '金额（元）',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (value) => formatNumber(value),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colorMap = {
          '待审批': 'orange',
          '已审批': 'blue',
          '采购中': 'cyan',
          '已完成': 'green',
          '已取消': 'red',
        }
        return <Tag color={colorMap[status]}>{status}</Tag>
      },
    },
    {
      title: '日期',
      dataIndex: 'createDate',
      key: 'createDate',
    },
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>资产管理部视角</h2>
        <p>公司整体资产状况及部门业务数据</p>
      </div>

      {/* 待处理事项提醒 */}
      {(pendingTasks.pendingApprovals > 0 || pendingTasks.pendingPurchases > 0) && (
        <Alert
          message="待处理事项"
          description={
            <div>
              <p>待审批采购: {pendingTasks.pendingApprovals} 项</p>
              <p>采购中项目: {pendingTasks.pendingPurchases} 项</p>
              <p>维修中资产: {pendingTasks.assetsInRepair} 项</p>
            </div>
          }
          type="warning"
          icon={<WarningOutlined />}
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      {/* 公司整体数据 */}
      <Card title="公司整体资产状况" style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Statistic
              title="资产原值"
              value={companyStats.totalOriginalValue}
              prefix={<DollarOutlined />}
              formatter={(value) => formatNumber(value)}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Statistic
              title="资产净值"
              value={companyStats.totalNetValue}
              prefix={<BankOutlined />}
              formatter={(value) => formatNumber(value)}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Statistic
              title="当年新增资产价值"
              value={companyStats.newAssetsValue}
              prefix={<PlusCircleOutlined />}
              formatter={(value) => formatNumber(value)}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Statistic
              title="预算执行率"
              value={companyStats.budgetExecutionRate}
              suffix="%"
              prefix={<PieChartOutlined />}
              precision={2}
            />
          </Col>
        </Row>
      </Card>

      {/* 资产管理部部门数据 */}
      {deptStats && (
        <Card title="资产管理部部门数据" style={{ marginBottom: 16 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Statistic
                title="部门资产原值"
                value={deptStats.totalOriginalValue}
                formatter={(value) => formatNumber(value)}
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Statistic
                title="部门资产净值"
                value={deptStats.totalNetValue}
                formatter={(value) => formatNumber(value)}
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Statistic
                title="部门预算执行率"
                value={deptStats.budgetExecutionRate}
                suffix="%"
                precision={2}
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Statistic
                title="当年新增资产"
                value={deptStats.newAssetsCount}
              />
            </Col>
          </Row>
        </Card>
      )}

      {/* 采购统计 */}
      <Card title="采购业务统计" style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Statistic
              title="待审批"
              value={purchaseStats.pending}
              prefix={<ShoppingOutlined />}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Statistic
              title="已审批/采购中"
              value={purchaseStats.approved}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Statistic
              title="已完成"
              value={purchaseStats.completed}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Statistic
              title="采购总金额"
              value={purchaseStats.totalAmount}
              formatter={(value) => formatNumber(value)}
            />
          </Col>
        </Row>
      </Card>

      {/* 图表 */}
      <Row gutter={[16, 16]} className="charts-row">
        <Col xs={24} lg={12}>
          <Card title="公司资产类别占比" className="chart-card">
            <ReactECharts
              option={companyCategoryPieOption}
              style={{ height: '400px' }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="月度采购趋势" className="chart-card">
            <ReactECharts
              option={monthlyPurchaseOption}
              style={{ height: '400px' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 采购明细表格 */}
      <Row gutter={[16, 16]} className="table-row">
        <Col xs={24}>
          <Card title="采购明细" className="table-card">
            <Table
              columns={purchaseColumns}
              dataSource={purchases.slice(0, 50)}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 800 }}
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

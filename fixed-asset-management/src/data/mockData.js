// 模拟数据 - 固定资产管理系统

// 资产类别
export const assetCategories = [
  { id: 1, name: '办公设备', code: 'OFFICE' },
  { id: 2, name: '生产设备', code: 'PRODUCTION' },
  { id: 3, name: '运输工具', code: 'VEHICLE' },
  { id: 4, name: '房屋建筑', code: 'BUILDING' },
  { id: 5, name: '电子设备', code: 'ELECTRONIC' },
  { id: 6, name: '其他', code: 'OTHER' },
]

// 部门列表
export const departments = [
  { id: 1, name: '资产管理部', code: 'ASSET_MGMT' },
  { id: 2, name: '生产部', code: 'PRODUCTION' },
  { id: 3, name: '销售部', code: 'SALES' },
  { id: 4, name: '研发部', code: 'RND' },
  { id: 5, name: '财务部', code: 'FINANCE' },
  { id: 6, name: '行政部', code: 'ADMIN' },
]

// 生成模拟资产数据
function generateAssets() {
  const assets = []
  const currentYear = new Date().getFullYear()
  
  departments.forEach(dept => {
    assetCategories.forEach(category => {
      const count = Math.floor(Math.random() * 20) + 5
      for (let i = 0; i < count; i++) {
        const purchaseYear = currentYear - Math.floor(Math.random() * 10)
        const originalValue = Math.floor(Math.random() * 500000) + 10000
        const depreciationYears = 5 + Math.floor(Math.random() * 10)
        const yearsUsed = currentYear - purchaseYear
        const depreciationRate = Math.min(yearsUsed / depreciationYears, 1)
        const netValue = Math.floor(originalValue * (1 - depreciationRate))
        const isNewThisYear = purchaseYear === currentYear
        
        assets.push({
          id: `${dept.id}-${category.id}-${i}`,
          name: `${category.name}-${dept.name}-${i + 1}`,
          categoryId: category.id,
          categoryName: category.name,
          departmentId: dept.id,
          departmentName: dept.name,
          originalValue,
          netValue,
          purchaseYear,
          isNewThisYear,
          status: Math.random() > 0.1 ? '正常' : '维修中',
        })
      }
    })
  })
  
  return assets
}

// 生成预算数据
function generateBudgets() {
  const budgets = []
  const currentYear = new Date().getFullYear()
  
  departments.forEach(dept => {
    assetCategories.forEach(category => {
      const budgetAmount = Math.floor(Math.random() * 2000000) + 500000
      const usedAmount = Math.floor(budgetAmount * (0.3 + Math.random() * 0.5))
      
      budgets.push({
        id: `${dept.id}-${category.id}`,
        departmentId: dept.id,
        departmentName: dept.name,
        categoryId: category.id,
        categoryName: category.name,
        year: currentYear,
        budgetAmount,
        usedAmount,
        remainingAmount: budgetAmount - usedAmount,
        executionRate: (usedAmount / budgetAmount * 100).toFixed(2),
      })
    })
  })
  
  return budgets
}

// 生成采购数据
function generatePurchases() {
  const purchases = []
  const currentYear = new Date().getFullYear()
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  
  departments.forEach(dept => {
    assetCategories.forEach(category => {
      const count = Math.floor(Math.random() * 5) + 1
      for (let i = 0; i < count; i++) {
        const month = months[Math.floor(Math.random() * 12)]
        const amount = Math.floor(Math.random() * 500000) + 50000
        const statuses = ['待审批', '已审批', '采购中', '已完成', '已取消']
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        
        purchases.push({
          id: `${dept.id}-${category.id}-${i}`,
          departmentId: dept.id,
          departmentName: dept.name,
          categoryId: category.id,
          categoryName: category.name,
          year: currentYear,
          month,
          amount,
          status,
          createDate: `${currentYear}-${month}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        })
      }
    })
  })
  
  return purchases
}

// 导出数据
export const assets = generateAssets()
export const budgets = generateBudgets()
export const purchases = generatePurchases()

// 计算统计数据
export function getCompanyStats() {
  const currentYear = new Date().getFullYear()
  
  const totalOriginalValue = assets.reduce((sum, asset) => sum + asset.originalValue, 0)
  const totalNetValue = assets.reduce((sum, asset) => sum + asset.netValue, 0)
  const newAssetsThisYear = assets.filter(a => a.isNewThisYear)
  const newAssetsValue = newAssetsThisYear.reduce((sum, asset) => sum + asset.originalValue, 0)
  
  const totalBudget = budgets.reduce((sum, b) => sum + b.budgetAmount, 0)
  const totalUsedBudget = budgets.reduce((sum, b) => sum + b.usedAmount, 0)
  
  // 按类别统计
  const categoryStats = assetCategories.map(category => {
    const categoryAssets = assets.filter(a => a.categoryId === category.id)
    const originalValue = categoryAssets.reduce((sum, a) => sum + a.originalValue, 0)
    const netValue = categoryAssets.reduce((sum, a) => sum + a.netValue, 0)
    const newAssetsCount = categoryAssets.filter(a => a.isNewThisYear).length
    const newAssetsValue = categoryAssets
      .filter(a => a.isNewThisYear)
      .reduce((sum, a) => sum + a.originalValue, 0)
    
    return {
      categoryId: category.id,
      categoryName: category.name,
      originalValue,
      netValue,
      count: categoryAssets.length,
      newAssetsCount,
      newAssetsValue,
      percentage: (originalValue / totalOriginalValue * 100).toFixed(2),
    }
  })
  
  return {
    totalOriginalValue,
    totalNetValue,
    newAssetsCount: newAssetsThisYear.length,
    newAssetsValue,
    totalBudget,
    totalUsedBudget,
    totalRemainingBudget: totalBudget - totalUsedBudget,
    budgetExecutionRate: (totalUsedBudget / totalBudget * 100).toFixed(2),
    categoryStats,
  }
}

// 获取部门统计数据
export function getDepartmentStats(departmentId) {
  const deptAssets = assets.filter(a => a.departmentId === departmentId)
  const deptBudgets = budgets.filter(b => b.departmentId === departmentId)
  const currentYear = new Date().getFullYear()
  
  const totalOriginalValue = deptAssets.reduce((sum, a) => sum + a.originalValue, 0)
  const totalNetValue = deptAssets.reduce((sum, a) => sum + a.netValue, 0)
  const newAssetsThisYear = deptAssets.filter(a => a.isNewThisYear)
  const newAssetsValue = newAssetsThisYear.reduce((sum, a) => sum + a.originalValue, 0)
  
  const totalBudget = deptBudgets.reduce((sum, b) => sum + b.budgetAmount, 0)
  const totalUsedBudget = deptBudgets.reduce((sum, b) => sum + b.usedAmount, 0)
  
  // 按类别统计
  const categoryStats = assetCategories.map(category => {
    const categoryAssets = deptAssets.filter(a => a.categoryId === category.id)
    const originalValue = categoryAssets.reduce((sum, a) => sum + a.originalValue, 0)
    const netValue = categoryAssets.reduce((sum, a) => sum + a.netValue, 0)
    
    return {
      categoryId: category.id,
      categoryName: category.name,
      originalValue,
      netValue,
      count: categoryAssets.length,
      percentage: totalOriginalValue > 0 ? (originalValue / totalOriginalValue * 100).toFixed(2) : '0',
    }
  })
  
  // 预算执行情况
  const budgetExecution = deptBudgets.map(budget => ({
    categoryName: budget.categoryName,
    budgetAmount: budget.budgetAmount,
    usedAmount: budget.usedAmount,
    remainingAmount: budget.remainingAmount,
    executionRate: budget.executionRate,
  }))
  
  return {
    departmentId,
    totalOriginalValue,
    totalNetValue,
    newAssetsCount: newAssetsThisYear.length,
    newAssetsValue,
    totalBudget,
    totalUsedBudget,
    totalRemainingBudget: totalBudget - totalUsedBudget,
    budgetExecutionRate: totalBudget > 0 ? (totalUsedBudget / totalBudget * 100).toFixed(2) : '0',
    categoryStats,
    budgetExecution,
  }
}

// 获取资产管理部业务数据
export function getAssetManagementStats() {
  const currentYear = new Date().getFullYear()
  
  // 公司整体数据
  const companyStats = getCompanyStats()
  
  // 资产管理部部门数据
  const assetMgmtDeptId = departments.find(d => d.code === 'ASSET_MGMT')?.id
  const deptStats = assetMgmtDeptId ? getDepartmentStats(assetMgmtDeptId) : null
  
  // 采购数据统计
  const pendingPurchases = purchases.filter(p => p.status === '待审批')
  const approvedPurchases = purchases.filter(p => p.status === '已审批' || p.status === '采购中')
  const completedPurchases = purchases.filter(p => p.status === '已完成')
  
  const monthlyPurchases = Array.from({ length: 12 }, (_, i) => {
    const month = String(i + 1).padStart(2, '0')
    const monthPurchases = purchases.filter(
      p => p.year === currentYear && p.month === month
    )
    return {
      month: `${currentYear}-${month}`,
      count: monthPurchases.length,
      amount: monthPurchases.reduce((sum, p) => sum + p.amount, 0),
    }
  })
  
  // 待处理事项
  const pendingTasks = {
    pendingApprovals: pendingPurchases.length,
    pendingPurchases: approvedPurchases.length,
    assetsInRepair: assets.filter(a => a.status === '维修中').length,
  }
  
  return {
    companyStats,
    deptStats,
    purchaseStats: {
      pending: pendingPurchases.length,
      approved: approvedPurchases.length,
      completed: completedPurchases.length,
      totalAmount: purchases.reduce((sum, p) => sum + p.amount, 0),
    },
    monthlyPurchases,
    pendingTasks,
  }
}

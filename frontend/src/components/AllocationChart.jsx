import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const COLORS = {
  stock: '#3b82f6',
  fii: '#8b5cf6',
  crypto: '#f59e0b',
  fixed: '#10b981'
}

const LABELS = {
  stock: 'Ações',
  fii: 'FIIs',
  crypto: 'Cripto',
  fixed: 'Renda Fixa'
}

export default function AllocationChart({ portfolio }) {
  const allocationMap = {}

  for (const position of portfolio) {
    const type = position.type
    const value = position.totalValue || position.totalInvested

    if (!allocationMap[type]) {
      allocationMap[type] = 0
    }
    allocationMap[type] += value
  }

  const data = Object.entries(allocationMap).map(([type, value]) => ({
    name: LABELS[type] || type,
    value: parseFloat(value.toFixed(2)),
    color: COLORS[type] || '#6b7280'
  }))

  function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <h2 className="text-white font-semibold mb-6">Allocation</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

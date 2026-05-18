import { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import api from '../services/api'

export default function EvolutionChart() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvolution() {
      try {
        const response = await api.get('/portfolio/evolution')
        setData(response.data)
      } catch (err) {
        console.error('Failed to load evolution data', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvolution()
  }, [])

  function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-')
    return `${day}/${month}/${year}`
  }

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-6">Portfolio Evolution</h2>
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <h2 className="text-white font-semibold mb-6">Portfolio Evolution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="#6b7280"
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <YAxis
            tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
            stroke="#6b7280"
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => formatCurrency(value)}
            labelFormatter={formatDate}
            contentStyle={{
              backgroundColor: '#111827',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Line
            type="monotone"
            dataKey="invested"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

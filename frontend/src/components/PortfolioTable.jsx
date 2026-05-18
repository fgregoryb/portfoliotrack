export default function PortfolioTable({ portfolio }) {
  function formatCurrency(value) {
    if (value === null || value === undefined) return '—'
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  function formatPercent(value) {
    if (value === null || value === undefined) return '—'
    const signal = value >= 0 ? '+' : ''
    return `${signal}${value.toFixed(2)}%`
  }

  function getTypeBadge(type) {
    const styles = {
      stock: 'bg-blue-500/20 text-blue-400',
      fii: 'bg-purple-500/20 text-purple-400',
      crypto: 'bg-yellow-500/20 text-yellow-400',
      fixed: 'bg-green-500/20 text-green-400'
    }
    const labels = {
      stock: 'Ação',
      fii: 'FII',
      crypto: 'Cripto',
      fixed: 'Renda Fixa'
    }
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[type] || 'bg-gray-500/20 text-gray-400'}`}>
        {labels[type] || type}
      </span>
    )
}

  function getReturnColor(value) {
    if (value === null || value === undefined) return 'text-gray-400'
    return value >= 0 ? 'text-green-400' : 'text-red-400'
  }

  const totalInvested = portfolio.reduce((sum, p) => sum + p.totalInvested, 0)
  const totalValue = portfolio.reduce((sum, p) => sum + (p.totalValue || 0), 0)
  const quotedInvested = portfolio.reduce(
    (sum, p) => (p.totalValue !== null ? sum + p.totalInvested : sum),
    0
  )
  const totalReturn = totalValue - quotedInvested

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-1">Total Invested</p>
          <p className="text-white text-xl font-bold">
            {formatCurrency(totalInvested)}
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-1">Current Value</p>
          <p className="text-white text-xl font-bold">
            {formatCurrency(totalValue)}
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-1">Total Return</p>
          <p className={`text-xl font-bold ${getReturnColor(totalReturn)}`}>
            {formatCurrency(totalReturn)}
          </p>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Ticker</th>
              <th className="text-right text-gray-400 text-sm font-medium px-6 py-4">Qty</th>
              <th className="text-right text-gray-400 text-sm font-medium px-6 py-4">Avg Price</th>
              <th className="text-right text-gray-400 text-sm font-medium px-6 py-4">Current Price</th>
              <th className="text-right text-gray-400 text-sm font-medium px-6 py-4">Total Value</th>
              <th className="text-right text-gray-400 text-sm font-medium px-6 py-4">Return</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map((position) => (
              <tr
                key={position.id}
                className="border-b border-gray-800 hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-semibold">{position.ticker}</p>
                    {getTypeBadge(position.type)}
                  </div>
                  <p className="text-gray-400 text-sm">{position.name}</p>
                </td>
                <td className="text-right text-white px-6 py-4">
                  {position.quantity}
                </td>
                <td className="text-right text-white px-6 py-4">
                  {formatCurrency(position.avgPrice)}
                </td>
                <td className="text-right text-white px-6 py-4">
                  {formatCurrency(position.currentPrice)}
                </td>
                <td className="text-right text-white px-6 py-4">
                  {formatCurrency(position.totalValue)}
                </td>
                <td className={`text-right px-6 py-4 ${getReturnColor(position.returnPercent)}`}>
                  <p>{formatCurrency(position.returnValue)}</p>
                  <p className="text-sm">{formatPercent(position.returnPercent)}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

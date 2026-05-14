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

  function getReturnColor(value) {
    if (value === null || value === undefined) return 'text-gray-400'
    return value >= 0 ? 'text-green-400' : 'text-red-400'
  }

  const totalInvested = portfolio.reduce((sum, p) => sum + p.totalInvested, 0)
  const totalValue = portfolio.reduce((sum, p) => sum + (p.totalValue || 0), 0)
  const totalReturn = totalValue - totalInvested

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4 mb-8">
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

      <div className="bg-gray-900 rounded-xl overflow-hidden">
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
                  <p className="text-white font-semibold">{position.ticker}</p>
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

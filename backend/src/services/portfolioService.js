const prisma = require('../prisma/client')
const { getQuote } = require('./quoteService')

function calculatePosition(transactions) {
  let quantity = 0
  let totalInvested = 0

  for (const transaction of transactions) {
    const qty = parseFloat(transaction.quantity)
    const price = parseFloat(transaction.unitPrice)

    if (transaction.type === 'buy') {
      totalInvested += qty * price
      quantity += qty
    } else if (transaction.type === 'sell') {
      const avgPrice = quantity > 0 ? totalInvested / quantity : 0
      totalInvested -= avgPrice * qty
      quantity -= qty
    }
  }

  const avgPrice = quantity > 0 ? totalInvested / quantity : 0

  return { quantity, totalInvested, avgPrice }
}

async function getPortfolio(userId) {
  const assets = await prisma.asset.findMany({
    where: { userId },
    include: {
      transactions: {
        orderBy: { date: 'asc' }
      }
    }
  })

  const portfolio = await Promise.all(
    assets.map(async (asset) => {
      if (asset.transactions.length === 0) {
        return null
      }

      const { quantity, totalInvested, avgPrice } = calculatePosition(
        asset.transactions
      )

      if (quantity <= 0) return null

      let currentPrice = null
      let totalValue = null
      let returnPercent = null
      let returnValue = null

      const supportsQuote = asset.type === 'stock' || asset.type === 'fii'

      if (supportsQuote) {
        try {
          const quote = await getQuote(asset.ticker)
          currentPrice = quote.price
          totalValue = quantity * currentPrice
          returnValue = totalValue - totalInvested
          returnPercent = ((currentPrice - avgPrice) / avgPrice) * 100
        } catch {
          // Se a cotação falhar, retorna os dados sem valores de mercado
        }
      }

      return {
        id: asset.id,
        ticker: asset.ticker,
        name: asset.name,
        type: asset.type,
        quantity,
        avgPrice: parseFloat(avgPrice.toFixed(2)),
        totalInvested: parseFloat(totalInvested.toFixed(2)),
        currentPrice,
        totalValue: totalValue ? parseFloat(totalValue.toFixed(2)) : null,
        returnValue: returnValue ? parseFloat(returnValue.toFixed(2)) : null,
        returnPercent: returnPercent
          ? parseFloat(returnPercent.toFixed(2))
          : null
      }
    })
  )

  return portfolio.filter(Boolean)
}

async function getEvolution(userId) {
  const assets = await prisma.asset.findMany({
    where: { userId },
    include: {
      transactions: {
        orderBy: { date: 'asc' }
      }
    }
  })

  const evolutionMap = {}

  for (const asset of assets) {
    for (const transaction of asset.transactions) {
      const date = transaction.date.toISOString().split('T')[0]
      if (!evolutionMap[date]) {
        evolutionMap[date] = 0
      }
      const qty = parseFloat(transaction.quantity)
      const price = parseFloat(transaction.unitPrice)
      if (transaction.type === 'buy') {
        evolutionMap[date] += qty * price
      } else if (transaction.type === 'sell') {
        evolutionMap[date] -= qty * price
      }
    }
  }

  const sorted = Object.entries(evolutionMap).sort(([a], [b]) =>
    a.localeCompare(b)
  )

  let cumulative = 0
  const evolution = sorted.map(([date, value]) => {
    cumulative += value
    return { date, invested: parseFloat(cumulative.toFixed(2)) }
  })

  return evolution
}

module.exports = { getPortfolio, calculatePosition, getEvolution }
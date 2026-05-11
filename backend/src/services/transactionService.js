const prisma = require('../prisma/client')

async function createTransaction(userId, assetId, { type, quantity, unitPrice, date }) {
  const asset = await prisma.asset.findFirst({
    where: { id: assetId, userId }
  })

  if (!asset) {
    throw new Error('Asset not found')
  }

  if (!['buy', 'sell'].includes(type)) {
    throw new Error('Transaction type must be buy or sell')
  }

  if (quantity <= 0 || unitPrice <= 0) {
    throw new Error('Quantity and unit price must be greater than zero')
  }

  const transaction = await prisma.transaction.create({
    data: {
      type,
      quantity,
      unitPrice,
      date: date ? new Date(date) : new Date(),
      assetId
    }
  })

  return transaction
}

async function getTransactionsByAsset(userId, assetId) {
  const asset = await prisma.asset.findFirst({
    where: { id: assetId, userId }
  })

  if (!asset) {
    throw new Error('Asset not found')
  }

  return prisma.transaction.findMany({
    where: { assetId },
    orderBy: { date: 'asc' }
  })
}

async function deleteTransaction(userId, assetId, transactionId) {
  const asset = await prisma.asset.findFirst({
    where: { id: assetId, userId }
  })

  if (!asset) {
    throw new Error('Asset not found')
  }

  const transaction = await prisma.transaction.findFirst({
    where: { id: transactionId, assetId }
  })

  if (!transaction) {
    throw new Error('Transaction not found')
  }

  await prisma.transaction.delete({ where: { id: transactionId } })
}

module.exports = { createTransaction, getTransactionsByAsset, deleteTransaction }
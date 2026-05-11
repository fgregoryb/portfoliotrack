const prisma = require('../prisma/client')

async function createAsset(userId, { ticker, name, type }) {
  const existing = await prisma.asset.findUnique({
    where: { userId_ticker: { userId, ticker: ticker.toUpperCase() } }
  })

  if (existing) {
    throw new Error('Asset already registered')
  }

  const asset = await prisma.asset.create({
    data: {
      ticker: ticker.toUpperCase(),
      name,
      type,
      userId
    }
  })

  return asset
}

async function getAssetsByUser(userId) {
  return prisma.asset.findMany({
    where: { userId },
    orderBy: { ticker: 'asc' }
  })
}

async function getAssetById(userId, assetId) {
  const asset = await prisma.asset.findFirst({
    where: { id: assetId, userId }
  })

  if (!asset) {
    throw new Error('Asset not found')
  }

  return asset
}

async function deleteAsset(userId, assetId) {
  const asset = await prisma.asset.findFirst({
    where: { id: assetId, userId }
  })

  if (!asset) {
    throw new Error('Asset not found')
  }

  await prisma.asset.delete({ where: { id: assetId } })
}

module.exports = { createAsset, getAssetsByUser, getAssetById, deleteAsset }
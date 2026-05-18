const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Limpa o banco antes de popular
  await prisma.transaction.deleteMany()
  await prisma.asset.deleteMany()
  await prisma.user.deleteMany()

  // Cria o usuário de demonstração
  const passwordHash = await bcrypt.hash('123456', 10)
  const user = await prisma.user.create({
    data: {
      email: 'demo@portfoliotrack.com',
      passwordHash
    }
  })

  console.log('✅ User created:', user.email)

  // Cria os ativos
  const petr4 = await prisma.asset.create({
    data: { ticker: 'PETR4', name: 'Petrobras', type: 'stock', userId: user.id }
  })

  const vale3 = await prisma.asset.create({
    data: { ticker: 'VALE3', name: 'Vale', type: 'stock', userId: user.id }
  })

  const mxrf11 = await prisma.asset.create({
    data: { ticker: 'MXRF11', name: 'Maxi Renda FII', type: 'fii', userId: user.id }
  })

  const hglg11 = await prisma.asset.create({
    data: { ticker: 'HGLG11', name: 'CSHG Logística FII', type: 'fii', userId: user.id }
  })

  const bitcoin = await prisma.asset.create({
    data: { ticker: 'BTC', name: 'Bitcoin', type: 'crypto', userId: user.id }
  })

  const tesouro = await prisma.asset.create({
    data: { ticker: 'TESOURO-SELIC', name: 'Tesouro Selic 2029', type: 'fixed', userId: user.id }
  })

  console.log('✅ Assets created')

  // Transações PETR4 — histórico de 2 anos
  await prisma.transaction.createMany({
    data: [
      { assetId: petr4.id, type: 'buy', quantity: 100, unitPrice: 28.50, date: new Date('2024-01-10') },
      { assetId: petr4.id, type: 'buy', quantity: 200, unitPrice: 32.00, date: new Date('2024-03-15') },
      { assetId: petr4.id, type: 'sell', quantity: 50, unitPrice: 35.00, date: new Date('2024-06-20') },
      { assetId: petr4.id, type: 'buy', quantity: 150, unitPrice: 38.50, date: new Date('2024-09-05') },
      { assetId: petr4.id, type: 'buy', quantity: 100, unitPrice: 36.00, date: new Date('2025-01-20') },
    ]
  })

  // Transações VALE3
  await prisma.transaction.createMany({
    data: [
      { assetId: vale3.id, type: 'buy', quantity: 150, unitPrice: 68.00, date: new Date('2024-02-08') },
      { assetId: vale3.id, type: 'buy', quantity: 100, unitPrice: 62.50, date: new Date('2024-05-14') },
      { assetId: vale3.id, type: 'sell', quantity: 80, unitPrice: 70.00, date: new Date('2024-08-22') },
      { assetId: vale3.id, type: 'buy', quantity: 200, unitPrice: 58.00, date: new Date('2025-02-10') },
    ]
  })

  // Transações MXRF11
  await prisma.transaction.createMany({
    data: [
      { assetId: mxrf11.id, type: 'buy', quantity: 300, unitPrice: 9.80, date: new Date('2024-01-25') },
      { assetId: mxrf11.id, type: 'buy', quantity: 500, unitPrice: 9.50, date: new Date('2024-04-10') },
      { assetId: mxrf11.id, type: 'buy', quantity: 200, unitPrice: 10.10, date: new Date('2024-10-15') },
      { assetId: mxrf11.id, type: 'buy', quantity: 400, unitPrice: 9.90, date: new Date('2025-03-05') },
    ]
  })

  // Transações HGLG11
  await prisma.transaction.createMany({
    data: [
      { assetId: hglg11.id, type: 'buy', quantity: 50, unitPrice: 158.00, date: new Date('2024-03-20') },
      { assetId: hglg11.id, type: 'buy', quantity: 30, unitPrice: 162.00, date: new Date('2024-07-18') },
      { assetId: hglg11.id, type: 'buy', quantity: 40, unitPrice: 155.00, date: new Date('2025-01-08') },
    ]
  })

  // Transações Bitcoin
  await prisma.transaction.createMany({
    data: [
      { assetId: bitcoin.id, type: 'buy', quantity: 0.05, unitPrice: 180000, date: new Date('2024-01-05') },
      { assetId: bitcoin.id, type: 'buy', quantity: 0.03, unitPrice: 220000, date: new Date('2024-04-20') },
      { assetId: bitcoin.id, type: 'sell', quantity: 0.02, unitPrice: 350000, date: new Date('2024-11-10') },
      { assetId: bitcoin.id, type: 'buy', quantity: 0.04, unitPrice: 480000, date: new Date('2025-02-28') },
    ]
  })

  // Transações Tesouro Selic
  await prisma.transaction.createMany({
    data: [
      { assetId: tesouro.id, type: 'buy', quantity: 1, unitPrice: 5000, date: new Date('2024-02-01') },
      { assetId: tesouro.id, type: 'buy', quantity: 1, unitPrice: 5000, date: new Date('2024-05-01') },
      { assetId: tesouro.id, type: 'buy', quantity: 1, unitPrice: 5000, date: new Date('2024-08-01') },
      { assetId: tesouro.id, type: 'buy', quantity: 1, unitPrice: 5000, date: new Date('2024-11-01') },
      { assetId: tesouro.id, type: 'buy', quantity: 1, unitPrice: 5000, date: new Date('2025-02-01') },
    ]
  })

  console.log('✅ Transactions created')
  console.log('')
  console.log('🎉 Seed completed!')
  console.log('')
  console.log('Login com:')
  console.log('  email: demo@portfoliotrack.com')
  console.log('  senha: 123456')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
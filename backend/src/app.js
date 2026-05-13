const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const assetRoutes = require('./routes/assetRoutes')
const transactionRoutes = require('./routes/transactionRoutes')
const portfolioRoutes = require('./routes/portfolioRoutes')


const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'PortfolioTrack API running' })
})

app.use('/auth', authRoutes)
app.use('/assets', assetRoutes)
app.use('/assets/:assetId/transactions', transactionRoutes)
app.use('/portfolio', portfolioRoutes)


module.exports = app
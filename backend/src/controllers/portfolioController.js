const portfolioService = require('../services/portfolioService')

async function getPortfolio(req, res) {
  try {
    const portfolio = await portfolioService.getPortfolio(req.userId)
    res.status(200).json(portfolio)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { getPortfolio }
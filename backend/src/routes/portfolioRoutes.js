const { Router } = require('express')
const portfolioController = require('../controllers/portfolioController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = Router()

router.use(authMiddleware)

router.get('/', portfolioController.getPortfolio)
router.get('/evolution', portfolioController.getEvolution)

module.exports = router

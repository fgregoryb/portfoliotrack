const { Router } = require('express')
const transactionController = require('../controllers/transactionController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = Router({ mergeParams: true })

router.use(authMiddleware)

router.post('/', transactionController.createTransaction)
router.get('/', transactionController.getTransactions)
router.delete('/:id', transactionController.deleteTransaction)

module.exports = router
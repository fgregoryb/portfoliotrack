const { Router } = require('express')
const assetController = require('../controllers/assetController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = Router()

router.use(authMiddleware)

router.post('/', assetController.createAsset)
router.get('/', assetController.getAssets)
router.get('/:id', assetController.getAssetById)
router.delete('/:id', assetController.deleteAsset)

module.exports = router
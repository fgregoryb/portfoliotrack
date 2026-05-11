const assetService = require('../services/assetService')

async function createAsset(req, res) {
  try {
    const asset = await assetService.createAsset(req.userId, req.body)
    res.status(201).json(asset)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

async function getAssets(req, res) {
  try {
    const assets = await assetService.getAssetsByUser(req.userId)
    res.status(200).json(assets)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function getAssetById(req, res) {
  try {
    const asset = await assetService.getAssetById(req.userId, req.params.id)
    res.status(200).json(asset)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

async function deleteAsset(req, res) {
  try {
    await assetService.deleteAsset(req.userId, req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

module.exports = { createAsset, getAssets, getAssetById, deleteAsset }
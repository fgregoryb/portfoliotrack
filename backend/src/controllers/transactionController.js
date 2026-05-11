const transactionService = require('../services/transactionService')

async function createTransaction(req, res) {
  try {
    const transaction = await transactionService.createTransaction(
      req.userId,
      req.params.assetId,
      req.body
    )
    res.status(201).json(transaction)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

async function getTransactions(req, res) {
  try {
    const transactions = await transactionService.getTransactionsByAsset(
      req.userId,
      req.params.assetId
    )
    res.status(200).json(transactions)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

async function deleteTransaction(req, res) {
  try {
    await transactionService.deleteTransaction(
      req.userId,
      req.params.assetId,
      req.params.id
    )
    res.status(204).send()
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

module.exports = { createTransaction, getTransactions, deleteTransaction }
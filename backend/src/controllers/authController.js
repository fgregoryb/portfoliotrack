const authService = require('../services/authService')

async function register(req, res) {
  try {
    const { email, password } = req.body
    const user = await authService.register(email, password)
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body
    const result = await authService.login(email, password)
    res.status(200).json(result)
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}

module.exports = { register, login }
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../prisma/client')

async function register(email, password) {
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error('Email already in use')
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, passwordHash }
  })

  return { id: user.id, email: user.email }
}

async function login(email, password) {
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw new Error('Invalid credentials')
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash)

  if (!passwordMatch) {
    throw new Error('Invalid credentials')
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

  return { token }
}

module.exports = { register, login }
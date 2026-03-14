const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.get('/games', async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  const [games, total] = await Promise.all([
    prisma.game.findMany({ skip, take: limit, orderBy: { id: 'asc' } }),
    prisma.game.count()
  ])

  res.json({ data: games, page, limit, total, pages: Math.ceil(total / limit) })
})

app.get('/games/:id', async (req, res) => {
  const game = await prisma.game.findUnique({ where: { id: Number(req.params.id) } })
  if (!game) return res.status(404).json({ error: 'Game not found' })
  res.json(game)
})

app.post('/games', async (req, res) => {
  const { title, genre, platform, releaseYear } = req.body
  if (!title || !genre || !platform || !releaseYear) {
    return res.status(400).json({ error: 'Missing required fields: title, genre, platform, releaseYear' })
  }
  const game = await prisma.game.create({
    data: { title, genre, platform, releaseYear: Number(releaseYear), rating: req.body.rating || null }
  })
  res.status(201).json(game)
})

app.put('/games/:id', async (req, res) => {
  const existing = await prisma.game.findUnique({ where: { id: Number(req.params.id) } })
  if (!existing) return res.status(404).json({ error: 'Game not found' })

  const { title, genre, platform, releaseYear } = req.body
  if (!title || !genre || !platform || !releaseYear) {
    return res.status(400).json({ error: 'Missing required fields: title, genre, platform, releaseYear' })
  }
  const game = await prisma.game.update({
    where: { id: Number(req.params.id) },
    data: { title, genre, platform, releaseYear: Number(releaseYear), rating: req.body.rating || null }
  })
  res.json(game)
})

app.delete('/games/:id', async (req, res) => {
  const existing = await prisma.game.findUnique({ where: { id: Number(req.params.id) } })
  if (!existing) return res.status(404).json({ error: 'Game not found' })
  await prisma.game.delete({ where: { id: Number(req.params.id) } })
  res.json({ message: 'Game deleted' })
})

module.exports = { app, prisma }
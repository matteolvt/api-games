const request = require('supertest')
const { app, prisma } = require('../src/app')

beforeAll(async () => {
  await prisma.game.deleteMany()
})

afterAll(async () => {
  await prisma.game.deleteMany()
  await prisma.$disconnect()
})

describe('GET /health', () => {
  it('should return 200', async () => {
    const res = await request(app).get('/health')
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe('ok')
  })
})

describe('POST /games', () => {
  it('should create a game and return 201', async () => {
    const res = await request(app).post('/games').send({
      title: 'The Legend of Zelda',
      genre: 'Adventure',
      platform: 'Nintendo Switch',
      releaseYear: 2017
    })
    expect(res.statusCode).toBe(201)
    expect(res.body.title).toBe('The Legend of Zelda')
  })

  it('should return 400 when fields are missing', async () => {
    const res = await request(app).post('/games').send({ title: 'Incomplete Game' })
    expect(res.statusCode).toBe(400)
  })
})

describe('GET /games/:id', () => {
  it('should return 404 for unknown id', async () => {
    const res = await request(app).get('/games/99999')
    expect(res.statusCode).toBe(404)
  })

  it('should return a game by id', async () => {
    const created = await request(app).post('/games').send({
      title: 'Dark Souls',
      genre: 'RPG',
      platform: 'PC',
      releaseYear: 2011
    })
    const res = await request(app).get(`/games/${created.body.id}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.title).toBe('Dark Souls')
  })
})

describe('DELETE /games/:id', () => {
  it('should return 404 when deleting unknown id', async () => {
    const res = await request(app).delete('/games/99999')
    expect(res.statusCode).toBe(404)
  })
})
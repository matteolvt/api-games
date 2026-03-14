const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.game.createMany({
    data: [
      { title: 'The Witcher 3', genre: 'RPG', platform: 'PC', releaseYear: 2015, rating: 9.8 },
      { title: 'Hollow Knight', genre: 'Metroidvania', platform: 'PC', releaseYear: 2017, rating: 9.5 },
      { title: 'Red Dead Redemption 2', genre: 'Action', platform: 'PS4', releaseYear: 2018, rating: 9.7 }
    ]
  })
  console.log('Seeded!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
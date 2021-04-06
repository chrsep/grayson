import Prisma from "@prisma/client"

const prisma = new Prisma.PrismaClient()

async function main() {
  await prisma.tag.create({
    data: { name: "Makanan" }
  })

  await prisma.tag.create({
    data: { name: "Pakaian" }
  })

  await prisma.tag.create({
    data: { name: "Karya Seni" }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

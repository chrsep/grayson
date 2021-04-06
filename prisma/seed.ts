import Prisma from "@prisma/client"

const prisma = new Prisma.PrismaClient()

async function main() {
  prisma.tag.create({
    data: [{ name: "Makanan" }, { name: "Pakaian" }, { name: "Karya Seni" }]
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

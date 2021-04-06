import Prisma from "@prisma/client"
import slugify from "slugify"

const prisma = new Prisma.PrismaClient()

async function main() {
  await prisma.tag.create({
    data: {
      slug: slugify("Makanan"),
      name: "Makanan"
    }
  })

  await prisma.tag.create({
    data: {
      slug: slugify("Pakaian"),
      name: "Pakaian"
    }
  })

  await prisma.tag.create({
    data: {
      slug: slugify("Karya Seni"),
      name: "Karya Seni"
    }
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

import Prisma from "@prisma/client"
import slugify from "slugify"
import { nanoid } from "nanoid"

const prisma = new Prisma.PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Chris",
      email: "hi@chrsep.dev"
    }
  })

  const companyName = "Stark Industries"
  await prisma.store.create({
    data: {
      name: companyName,
      address: "Stark HQ, Stark Road, Starky Stark",
      phone: "62 2938 4899",
      slug: slugify(`Stark Industries-${nanoid(5)}`, { lower: true }),
      users: {
        connect: {
          id: user.id
        }
      },
      owner: {
        connect: {
          id: user.id
        }
      }
    }
  })
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

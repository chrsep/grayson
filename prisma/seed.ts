import Prisma from "@prisma/client"
import slugify from "slugify"
import argon2 from "argon2"
import { nanoid } from "nanoid"

const prisma = new Prisma.PrismaClient()

async function main() {
  await prisma.tag.create({
    data: {
      slug: slugify("Makanan", { lower: true }),
      name: "Makanan"
    }
  })

  await prisma.tag.create({
    data: {
      slug: slugify("Pakaian", { lower: true }),
      name: "Pakaian"
    }
  })

  await prisma.tag.create({
    data: {
      slug: slugify("Karya Seni", { lower: true }),
      name: "Karya Seni"
    }
  })

  const password = await argon2.hash("test")
  const user = await prisma.user.create({
    data: {
      name: "Chris",
      email: "hi@chrsep.dev",
      password: password
    }
  })

  const companyName = "Stark Industries"
  await prisma.store.create({
    data: {
      name: companyName,
      address: "Stark HQ, Stark Road, Starky Stark",
      phone: "62 2938 4899",
      slug: slugify("Stark Industries" + "-" + nanoid(5), { lower: true }),
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
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

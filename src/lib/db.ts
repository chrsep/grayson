import { PrismaClient, Store } from "@prisma/client"
import slugify from "slugify"
import { nanoid } from "nanoid"

const db = new PrismaClient()

export const findUserStores = async (userEmail: string) => {
  return db.store.findMany({
    where: {
      users: {
        some: {
          email: userEmail
        }
      }
    }
  })
}

export const insertStore = async (
  store: Omit<Store, "id" | "owner" | "ownerId" | "slug" | "address">,
  ownerEmail: string
) => {
  return db.store.create({
    data: {
      ...store,
      slug: slugify(`${store.name}-${nanoid(3)}`),
      users: {
        connect: {
          email: ownerEmail
        }
      },
      owner: {
        connect: {
          email: ownerEmail
        }
      }
    }
  })
}

export const findStoreBySlug = async (slug: string) => {
  return db.store.findUnique({
    where: {
      slug
    }
  })
}

export const findStoreWithProductsBySlug = async (slug: string) => {
  return db.store.findUnique({
    where: {
      slug
    },
    include: {
      products: true
    }
  })
}

export default db

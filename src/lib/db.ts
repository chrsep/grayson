import { PrismaClient, Product, Store } from "@prisma/client"
import slugify from "slugify"
import { nanoid } from "nanoid"
import { User } from "next-auth"

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

export const insertProduct = async (
  product: Omit<Product, "id" | "storeId" | "slug">,
  storeSlug: string
) => {
  return db.product.create({
    data: {
      ...product,
      slug: `${slugify(product.name)}-${nanoid(3)}`,
      store: {
        connect: {
          slug: storeSlug
        }
      }
    }
  })
}

export const updateUser = async (id: number, user: Omit<User, "id">) => {
  return db.user.update({
    data: user,
    where: { id }
  })
}

export const findUserByEmail = async (email: string) => {
  return db.user.findUnique({
    where: { email }
  })
}

export default db

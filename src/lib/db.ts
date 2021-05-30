import { PrismaClient, Product, Store } from "@prisma/client"
import slugify from "slugify"
import { nanoid } from "nanoid"
import { User } from "next-auth"

let db: PrismaClient = null

export const getDB = () => {
  if (db === null) {
    db = new PrismaClient()
  }
  return db
}

export const findUserStores = async (userEmail: string) => {
  return getDB().store.findMany({
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
  return getDB().store.create({
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
  return getDB().store.findUnique({
    where: {
      slug
    }
  })
}

export const findStoreWithProductsBySlug = async (slug: string) => {
  return getDB().store.findUnique({
    where: {
      slug
    },
    include: {
      products: true
    }
  })
}

export const insertProduct = async (
  product: Omit<Product, "id" | "storeId" | "slug" | "images"> & { images: string[] },
  storeSlug: string
) => {
  return getDB().product.create({
    data: {
      ...product,
      slug: `${slugify(product.name)}-${nanoid(3)}`,
      store: {
        connect: {
          slug: storeSlug
        }
      },
      images: {
        create: product.images.map((image) => ({
          objectName: image
        }))
      }
    }
  })
}

export const updateUser = async (id: number, user: Omit<User, "id">) => {
  return getDB().user.update({
    data: user,
    where: { id }
  })
}

export const findUserByEmail = async (email: string) => {
  return getDB().user.findUnique({
    where: { email }
  })
}

export const findUserByEmailWithStores = async (email: string) => {
  return getDB().user.findUnique({
    where: { email },
    include: {
      stores: true
    }
  })
}

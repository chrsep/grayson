import { ProductImage, Product, Store } from "@prisma/client"
import slugify from "slugify"
import { nanoid } from "nanoid"
import { User } from "next-auth"
import prisma from "@lib/prisma"

export const findUserStores = async (userEmail: string) => {
  return prisma.store.findMany({
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
  return prisma.store.create({
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
  return prisma.store.findUnique({
    where: {
      slug
    }
  })
}

export const findStoreWithProductsBySlug = async (slug: string) => {
  return prisma.store.findUnique({
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
  return prisma.product.create({
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
  return prisma.user.update({
    data: user,
    where: { id }
  })
}

export const updateStore = async (id: string, user: Omit<Store, "id">) => {
  return prisma.store.update({
    data: user,
    where: { id }
  })
}

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email }
  })
}

export const findUserByEmailWithStores = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
    include: {
      stores: true
    }
  })
}

export const findProductBySlugWithImages = async (slug: string) => {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      images: true
    }
  })
}

export const updateProduct = async (
  id: string,
  product: Product,
  images: Omit<ProductImage, "productId">[]
) => {
  const originalImages = await prisma.productImage.findMany({
    where: {
      productId: product.id
    }
  })

  return prisma.product.update({
    where: { id },
    include: { images: true },
    data: {
      ...product,
      images: {
        disconnect: originalImages
          .filter((image) => images.findIndex((i) => image.objectName === i.objectName) === -1)
          .map((image) => ({ objectName: image.objectName })),
        connectOrCreate: images.map((image) => ({
          where: { objectName: image.objectName },
          create: {
            objectName: image.objectName
          }
        }))
      }
    }
  })
}

export const deleteStoreBySlug = async (slug: string) => {
  await prisma.product.deleteMany({
    where: {
      store: {
        slug
      }
    }
  })

  return prisma.store.delete({
    where: { slug }
  })
}

export const findProductsWithPrimaryImagesAndStore = () => {
  return prisma.product.findMany({
    include: {
      images: {
        take: 1
      },
      store: true
    }
  })
}

export const findProductsByNameStoreOrOwner = (query: string) => {
  return prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive"
          }
        },
        {
          store: {
            name: {
              contains: query,
              mode: "insensitive"
            }
          }
        },
        {
          store: {
            owner: {
              name: {
                contains: query,
                mode: "insensitive"
              }
            }
          }
        }
      ]
    },
    include: {
      images: {
        take: 1
      },
      store: true
    }
  })
}

export const deleteProductBySlug = (slug: string) => {
  return prisma.product.delete({
    where: { slug }
  })
}

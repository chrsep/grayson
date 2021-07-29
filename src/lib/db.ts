import { Category, Product, ProductImage, Store } from "@prisma/client"
import slugify from "slugify"
import { nanoid } from "nanoid"
import { User } from "next-auth"
import prisma from "@lib/prisma"
import { LineItem } from "./domain"

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
  store: Omit<Store, "id" | "owner" | "ownerId" | "slug" | "address" | "howToPay">,
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

export const findStoreById = async (id: string) => {
  return prisma.store.findUnique({ where: { id } })
}

export const findStoreWithProductsBySlug = async (slug: string) => {
  return prisma.store.findUnique({
    where: {
      slug
    },
    include: {
      products: {
        include: {
          images: {
            take: 1
          }
        }
      }
    }
  })
}

export const insertProduct = async (
  product: Omit<Product, "id" | "storeId" | "slug" | "images">,
  images: Omit<ProductImage, "productId">[],
  storeId: string
) => {
  return prisma.product.create({
    data: {
      ...product,
      slug: `${slugify(product.name)}-${nanoid(3)}`,
      store: {
        connect: {
          id: storeId
        }
      },
      images: {
        create: images.map(({ key, url, base64 }) => ({ key, url, base64 }))
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

export const findProductByIdWithImages = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
    include: {
      images: true
    }
  })
}

export const findProductsByCategory = async (category: Category) => {
  return prisma.product.findMany({
    where: { category },
    include: {
      images: {
        take: 1
      },
      store: true
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

  const imageToDelete = originalImages
    .filter((image) => images.findIndex((i) => image.key === i.key) === -1)
    .map((image) => ({ key: image.key }))

  if (imageToDelete.length > 0) {
    await prisma.productImage.deleteMany({
      where: {
        key: { in: imageToDelete.map(({ key }) => key) }
      }
    })
  }

  const updatedProduct = await prisma.product.update({
    where: { id },
    include: { images: true },
    data: {
      ...product,
      images: {
        connectOrCreate: images
          .filter((image) => originalImages.findIndex((i) => image.key === i.key) === -1)
          .map((image) => ({
            where: { key: image.key },
            create: {
              key: image.key,
              url: image.url,
              base64: image.base64
            }
          }))
      }
    }
  })

  return { deletedImage: imageToDelete, product: updatedProduct }
}

export const deleteStoreBySlug = async (slug: string) => {
  await prisma.product.deleteMany({
    where: { store: { slug } }
  })

  return prisma.store.delete({ where: { slug } })
}

export const deleteStoreById = async (id: string) => {
  await prisma.product.deleteMany({
    where: { store: { id } }
  })

  return prisma.store.delete({ where: { id } })
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

export const deleteProductById = (id: string) => {
  return prisma.product.delete({
    where: { id }
  })
}

export const findProductBySlug = (slug: string) => {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      store: {
        include: {
          owner: {
            select: {
              imageBase64: true,
              image: true,
              whatsapp: true,
              email: true,
              name: true
            }
          }
        }
      },
      images: true
    }
  })
}

export const findCategoryHighlights = async (
  category: Category,
  excludedProductId?: string,
  take = 6
) => {
  return prisma.product.findMany({
    where: {
      category,
      id: {
        not: excludedProductId
      }
    },
    include: {
      images: {
        take: 1
      },
      store: true
    },
    take
  })
}

export const findStoreHighlights = async (slug: string, excludedProductId?: string, take = 6) => {
  return prisma.product.findMany({
    where: {
      store: {
        slug
      },
      id: {
        not: excludedProductId
      }
    },
    include: {
      images: {
        take: 1
      },
      store: true
    },
    take
  })
}

export const findLineItemsData = async (items: LineItem[]) => {
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: items.map((item) => item.productId)
      }
    },
    orderBy: {
      id: "desc"
    },
    include: {
      store: {
        select: {
          whatsapp: true
        }
      }
    }
  })

  return products.map((product) => {
    const item = items.find((item) => item.productId === product.id)
    return { ...product, qty: item?.qty || 0 }
  })
}

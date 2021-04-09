import type { PrismaClient, Tag, Store } from "@prisma/client/index.js"
import * as prisma from "@prisma/client/index.js"

let db: PrismaClient
if (prisma.PrismaClient) {
  db = new prisma.PrismaClient()
} else {
  // NOTE: sveltest workaround
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  db = new prisma.default.PrismaClient()
}

export const findAllTags = async (): Promise<Tag[]> => {
  return await db.tag.findMany()
}

export const findStoreBySlug = async (slug: string): Promise<Store> => {
  return await db.store.findFirst({ where: { slug } })
}

export const findStoreBySlugAndUserEmail = async (slug: string, email: string): Promise<Store> => {
  return await db.store.findFirst({
    where: {
      slug,
      owner: { email }
    }
  })
}

export const updateStoreBySlug = async (slug: string, data: Partial<Store>): Promise<Store> => {
  return await db.store.update({ where: { slug }, data })
}

export default db

import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

export const findAllStores = async (userEmail: string) => {
  const stores = await db.store.findMany({
    where: {
      users: {
        some: {
          email: userEmail
        }
      }
    }
  })

  return stores
}

export default db

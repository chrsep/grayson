import Prisma from "@prisma/client"
import type { RequestHandler } from "@sveltejs/kit"

const prisma = new Prisma.PrismaClient()

export const get: RequestHandler = async () => {
  await prisma.$connect()
  const users = await prisma.user.findMany()

  return {
    body: users
  }
}

import type { RequestHandler } from "@sveltejs/kit"
import Prisma from "@prisma/client/index.js"

const prisma = new Prisma.PrismaClient()

export const get: RequestHandler = async () => {
  await prisma.$connect()
  const users = await prisma.user.findMany()

  return {
    body: users
  }
}

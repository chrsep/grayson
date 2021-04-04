import type { PrismaClient } from "@prisma/client/index.js"
import * as prisma from "@prisma/client/index.js" // it seems to not like this

let db: PrismaClient
if (prisma.PrismaClient) {
  db = new prisma.PrismaClient()
} else {
  // NOTE: sveltekit workaround
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  db = new prisma.default.PrismaClient()
}

export default db

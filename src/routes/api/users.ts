import type { RequestHandler } from "@sveltejs/kit"
import db from "$lib/db"

export const get: RequestHandler = async () => {
  await db.$connect()
  const users = await db.user.findMany()

  return {
    body: users
  }
}

import db from "$lib/db"
import type { RequestHandler } from "@sveltejs/kit"

export const get: RequestHandler = async () => {
  await db.$connect()
  const users = await db.user.findMany()

  return {
    body: users
  }
}

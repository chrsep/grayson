import type { GetContext } from "@sveltejs/kit"
import db from "$lib/db"
import { parseSession } from "$lib/auth"

export const getContext: GetContext = async ({ headers }) => {
  const session = parseSession(headers.cookie)

  if (!session) {
    return {}
  }

  const user = await db.user.findFirst({ where: { id: session.id } })

  return { user }
}

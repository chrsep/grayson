import type { GetContext, GetSession } from "@sveltejs/kit"
import db from "$lib/db"
import { parseSession } from "$lib/auth"

export const getContext: GetContext = async ({ headers }) => {
  const session = parseSession(headers.cookie)
  if (!session) return {}

  try {
    const exists = db.session.findFirst({ where: { id: session.access_token } })
    if (exists === null) return {}

    const user = await db.user.findFirst({ where: { id: session.id } })
    if (user === null) return {}

    return {
      user: {
        name: user.name,
        email: user.email
      }
    }
  } catch (e) {
    console.log(e.message)
  }
}

export const getSession: GetSession = ({ context }) => {
  if (context.user) {
    return {
      user: {
        name: context.user?.name,
        email: context.user?.email
      }
    }
  }

  return { user: null }
}

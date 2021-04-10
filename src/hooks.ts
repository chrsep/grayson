import type { GetContext, GetSession } from "@sveltejs/kit"
import { findSessionByAccessToken, findUserById } from "$lib/db"
import { parseSession } from "$lib/auth"
import type { Context } from "$lib/domain"

export const getContext: GetContext<Promise<Context>> = async ({ headers }) => {
  try {
    const session = parseSession(headers.cookie)
    if (!session) return

    const exists = await findSessionByAccessToken(session.access_token)
    if (exists === null) return

    const user = await findUserById(session.id)
    if (user === null) return

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

export const getSession: GetSession<Context> = ({ context: { user } }) => {
  return {
    user: user || null
  }
}

import type { GetSession, Handle } from "@sveltejs/kit"
import { findSessionByAccessToken, findUserById } from "$lib/db"
import { parseSession } from "$lib/auth"
import type { Context } from "$lib/domain"

export const handle: Handle = async ({ request, render }) => {
  try {
    const session = parseSession(request.headers.cookie)
    if (!session) return render(request)

    const exists = await findSessionByAccessToken(session.access_token)
    if (exists === null) return render(request)

    const user = await findUserById(session.id)
    if (user === null) return render(request)

    request.locals = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
    const response = render(request)
    return {
      ...response
    }
  } catch (e) {
    console.log(e.message)
  }
}

export const getSession: GetSession<Context> = ({ locals: { user } }) => {
  return {
    user: user || null
  }
}

import type { GetSession, Handle } from "@sveltejs/kit"
import { findUserById } from "$lib/db"
import type { Locals } from "$lib/domain"
import { parse } from "$lib/cookie"
import { findSessionByAccessToken } from "$lib/redis"

export const getSession: GetSession<Locals> = ({ locals: { user } }) => {
  return {
    user: user || null
  }
}

export const handle: Handle = async ({ request, render }) => {
  const cookie = parse(request.headers.cookie ?? "")
  if (!cookie.session) return render(request)

  const userId = await findSessionByAccessToken(cookie.session)
  if (userId === null) return render(request)

  const user = await findUserById(userId)
  if (user === null) return render(request)

  request.locals = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
  return render(request)
}

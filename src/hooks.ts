import type { GetSession, Handle } from "@sveltejs/kit"
import { findSessionByAccessToken, findUserById } from "$lib/db"
import type { Locals } from "$lib/domain"
import { parse } from "$lib/cookie"

export const getSession: GetSession<Locals> = ({ locals: { user } }) => {
  return {
    user: user || null
  }
}

export const handle: Handle = async ({ request, render }) => {
  const cookie = parse(request.headers.cookie ?? "")
  if (!cookie.session) return render(request)

  const session = await findSessionByAccessToken(cookie.session)
  if (session === null) return render(request)

  request.locals = {
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email
    }
  }
  return render(request)
}

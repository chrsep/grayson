import type { GetSession, Handle } from "@sveltejs/kit"
import { findSessionByAccessToken, findUserById } from "$lib/db"
import { parseSession } from "$lib/auth"
import type { Locals } from "$lib/domain"
import type { ServerRequest } from "@sveltejs/kit/types/endpoint"
import type { ServerResponse } from "@sveltejs/kit/types/hooks"
import { unauthorized } from "$lib/rest"

export const getSession: GetSession<Locals> = ({ locals: { user } }) => {
  return {
    user: user || null
  }
}

export const handle: Handle = async ({ request, render }) => {
  if (request.path.startsWith("/api")) {
    return handleApiRequest(request, render)
  } else {
    return render(request)
  }
}

const handleApiRequest = async (
  request: ServerRequest,
  render: (request: ServerRequest) => ServerResponse | Promise<ServerResponse>
): Promise<ServerResponse> => {
  const session = parseSession(request.headers.cookie)
  if (!session) return unauthorized()

  const exists = await findSessionByAccessToken(session.access_token)
  if (exists === null) return unauthorized()

  const user = await findUserById(session.id)
  if (user === null) return unauthorized()

  request.locals = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }

  return render(request)
}

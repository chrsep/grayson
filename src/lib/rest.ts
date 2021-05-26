import { Any, TypeOf } from "io-ts"
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { Session } from "next-auth"
import { getSession } from "next-auth/client"

interface Handler {
  get?: NextApiHandler
  post?: NextApiHandler
  put?: NextApiHandler
  patch?: NextApiHandler
}

export function newApi(handler: Handler): NextApiHandler {
  return (req, res) => {
    switch (req.method) {
      case "POST":
        handler.post(req, res)
        break
      case "GET":
        handler.get(req, res)
        break
      case "PUT":
        handler.put(req, res)
        break
      case "PATCH":
        handler.patch(req, res)
        break
      default: {
        res.status(401).json({
          error: "not_authenticated",
          description: "The user does not have an active session or is not authenticated"
        })
      }
    }
  }
}

export function newProtectedApi(handler: Handler): NextApiHandler {
  const apiRoute = newApi(handler)

  return async (req, res) => {
    const session = await getSession({ req })

    if (!session || !session.user) {
      res.status(401).json({
        error: "not_authenticated",
        description: "The user does not have an active session or is not authenticated"
      })
      return
    }

    await apiRoute(req, res)
  }
}

type MutationHandler<T extends Any> = (
  body: TypeOf<T>,
  session: Session,
  res: NextApiResponse,
  req: NextApiRequest
) => Promise<{
  status: number
  body: unknown
}>

/** validate body and get session */
export function newMutationHandler<T extends Any>(
  bodyValidator: T,
  handler: MutationHandler<T>
): NextApiHandler {
  return async (req, res) => {
    const session = await getSession({ req })
    const data = JSON.parse(req.body)

    if (bodyValidator.is(data)) {
      const result = await handler(data, session, res, req)
      res.status(result.status).json(result.body)
    } else {
      res.status(400).json({
        error: "bad_request",
        description: "The data provided does not adhere to the standard"
      })
    }
  }
}

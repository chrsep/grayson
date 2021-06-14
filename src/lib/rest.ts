import { Any, TypeOf } from "io-ts"
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { Session } from "next-auth"
import { getSession } from "next-auth/client"
import { withSentry } from "@sentry/nextjs"

interface Handler {
  get?: NextApiHandler
  post?: NextApiHandler
  put?: NextApiHandler
  patch?: NextApiHandler
  del?: NextApiHandler
}

/** handles requests based on their methods */
function handleMethod(handler: Handler): NextApiHandler {
  return async (req, res) => {
    switch (req.method) {
      case "POST":
        await handler.post(req, res)
        break
      case "GET":
        await handler.get(req, res)
        break
      case "PUT":
        await handler.put(req, res)
        break
      case "PATCH":
        await handler.patch(req, res)
        break
      case "DELETE":
        await handler.del(req, res)
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

export function newPublicApi(handler: Handler): NextApiHandler {
  return withSentry(async (req, res) => {
    await handleMethod(handler)(req, res)
  })
}

export function newProtectedApi(handler: Handler): NextApiHandler {
  return withSentry(async (req, res) => {
    const session = await getSession({ req })

    if (!session || !session.user) {
      res.status(401).json({
        error: "not_authenticated",
        description: "The user does not have an active session or is not authenticated"
      })
      return
    }

    await handleMethod(handler)(req, res)
  })
}

type MutationHandler<T extends Any> = (
  body: TypeOf<T>,
  session: Session,
  req: NextApiRequest,
  res: NextApiResponse
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
      const result = await handler(data, session, req, res)
      res.status(result.status).json(result.body)
    } else {
      res.status(400).json({
        error: "bad_request",
        description: "The data provided does not adhere to the standard"
      })
    }
  }
}

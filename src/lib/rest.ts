/* eslint-disable no-fallthrough */
// noinspection FallThroughInSwitchStatementJS

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
        if (handler.post) {
          await handler.post(req, res)
          break
        }
      case "GET":
        if (handler.get) {
          await handler.get(req, res)
          break
        }
      case "PUT":
        if (handler.put) {
          await handler.put(req, res)
          break
        }
      case "PATCH":
        if (handler.patch) {
          await handler.patch(req, res)
          break
        }
      case "DELETE":
        if (handler.del) {
          await handler.del(req, res)
          break
        }
      default: {
        res.status(405).json({
          error: "method_not_allowed",
          description: "this method is not allowed"
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

export interface ApiResponse {
  status: number
  body: unknown
}

type MutationHandler<T extends Any> = (
  body: TypeOf<T>,
  session: Session | null,
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<ApiResponse>

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

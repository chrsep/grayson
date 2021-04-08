import type { Context } from "$lib/domain"
import type { RequestHandler } from "@sveltejs/kit"

export const post: RequestHandler<Context, { id: string }> = ({ body }) => {
  return {
    status: 201
  }
}

import type { RequestHandler } from "@sveltejs/kit"
import { findAllTags } from "$lib/db"
import type { Tag } from "$lib/domain"

export const get: RequestHandler = async () => {
  const tags: Tag[] = await findAllTags()

  return {
    body: JSON.stringify(tags)
  }
}

import { insertProduct } from "@lib/db"
import { number, string, type, TypeOf } from "io-ts"
import { newMutationHandler, newProtectedApi } from "@lib/rest"

const PostBody = type({
  name: string,
  description: string,
  phone: string,
  price: number,
  storeSlug: string
})
export type PostProductBody = TypeOf<typeof PostBody>

const post = newMutationHandler(PostBody, async (data, session, { query: { slug } }) => {
  if (string.is(slug)) {
    const store = await insertProduct(data, slug as string)
    return { status: 200, body: store }
  }

  return {
    status: 400,
    body: {
      error: "bad_request",
      description: "The data provided does not adhere to the standard"
    }
  }
})

export default newProtectedApi({ post })

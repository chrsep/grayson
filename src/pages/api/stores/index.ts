import { insertStore } from "@lib/db"
import { string, type, TypeOf } from "io-ts"
import { newProtectedApi, newMutationHandler } from "@lib/rest"

const PostBody = type({
  name: string,
  description: string,
  phone: string,
  whatsapp: string,
  address: string,
  city: string,
  province: string,
  postcode: string,
  howToPay: string
})
export type PostStoreBody = TypeOf<typeof PostBody>

const post = newMutationHandler(PostBody, async (data, session) => {
  const store = await insertStore(data, session.user.email)
  return { status: 200, body: store }
})

export default newProtectedApi({ post })

import { insertStore } from "@lib/db"
import { newMutationHandler, newProtectedApi } from "@lib/rest"
import { nullType, string, type, TypeOf, union } from "io-ts"

const PostBody = type({
  name: string,
  description: string,
  phone: string,
  whatsapp: string,
  address: string,
  city: string,
  province: string,
  postcode: string,
  howToPay: string,
  logo: union([nullType, string])
})
export type PostStoreBody = TypeOf<typeof PostBody>

const post = newMutationHandler(PostBody, async (data, session) => {
  if (!session?.user?.email) return { status: 403, body: {} }
  const store = await insertStore(data, session.user?.email)

  return { status: 200, body: store }
})

export default newProtectedApi({ post })

import { newMutationHandler, newProtectedApi } from "@lib/rest"
import { partial, string } from "io-ts"
import { findStoreBySlug, updateStore } from "@lib/db"

const PatchBody = partial({
  name: string,
  description: string,
  phone: string,
  whatsapp: string,
  address: string,
  city: string,
  province: string,
  postcode: string,
  howToPay: string,
  logo: string
})
const patch = newMutationHandler(PatchBody, async (data, session, { query: { slug } }) => {
  if (string.is(slug)) {
    const store = await findStoreBySlug(slug)
    const updatedStore = {
      ...store,
      ...data
    }
    await updateStore(store.id, updatedStore)

    return {
      status: 200,
      body: updatedStore
    }
  }

  return {
    status: 400,
    body: {
      error: "bad_request",
      description: "The data provided does not adhere to the standard"
    }
  }
})

export default newProtectedApi({ patch })

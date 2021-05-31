import { newMutationHandler, newProtectedApi } from "@lib/rest"
import { nullType, partial, string, union } from "io-ts"
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
  logo: union([nullType, string])
})
const patch = newMutationHandler(PatchBody, async (data, session, { query: { storeSlug } }) => {
  if (string.is(storeSlug)) {
    const store = await findStoreBySlug(storeSlug)
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

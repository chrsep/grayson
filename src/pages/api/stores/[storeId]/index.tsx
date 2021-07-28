import { newMutationHandler, newProtectedApi } from "@lib/rest"
import { nullType, partial, string, union } from "io-ts"
import { deleteStoreById, findStoreById, updateStore } from "@lib/db"
import { NextApiHandler } from "next"

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
const patch = newMutationHandler(PatchBody, async (data, session, { query: { storeId } }) => {
  if (string.is(storeId)) {
    const store = await findStoreById(storeId)
    if (!store) {
      return {
        status: 404,
        body: { message: "store not found" }
      }
    }
    const updatedStore = { ...store, ...data }
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

const del: NextApiHandler = async ({ query: { storeId } }, res) => {
  if (string.is(storeId)) {
    await deleteStoreById(storeId)
    res.status(201).json({})
  } else {
    res.status(400).json({
      error: "bad_request",
      description: "the data provided does not adhere to the standard"
    })
  }
}

export default newProtectedApi({ patch, del })

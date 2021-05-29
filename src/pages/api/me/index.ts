import { newMutationHandler, newProtectedApi } from "@lib/rest"
import { nullType, partial, string, TypeOf, union } from "io-ts"
import { findUserByEmail, updateUser } from "@lib/db"

export type PatchUserBody = TypeOf<typeof PatchBody>
const PatchBody = partial({
  name: string,
  email: string,
  phone: string,
  whatsapp: string,
  address: string,
  city: string,
  province: string,
  postcode: string,
  image: union([nullType, string])
})
const patch = newMutationHandler(PatchBody, async (data, session) => {
  const user = await findUserByEmail(session.user.email)
  let updatedUser = {
    ...user,
    ...data
  }

  updatedUser = await updateUser(user.id, updatedUser)
  return { status: 200, body: { updatedUser } }
})

export default newProtectedApi({ patch })

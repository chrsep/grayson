import { newMutationHandler, newProtectedApi } from "@lib/rest"
import { partial, string } from "io-ts"
import { findUserByEmail, updateUser } from "@lib/db"

const PatchBody = partial({
  name: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  province: string,
  postcode: string
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

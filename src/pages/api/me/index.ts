import { newMutationHandler, newProtectedApi } from "@lib/rest"
import { nullType, partial, string, TypeOf, union } from "io-ts"
import { findUserByEmail, updateUser } from "@lib/db"
import { generateS3Url } from "@lib/image"
import { getPlaiceholder } from "plaiceholder"

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
  imageKey: union([nullType, string])
})
const patch = newMutationHandler(PatchBody, async (data, session) => {
  if (!session?.user?.email) {
    return {
      status: 401,
      body: { message: "unauthorized" }
    }
  }

  const user = await findUserByEmail(session.user.email)
  let updatedUser = { ...user, ...data }
  if (!user) {
    return {
      status: 401,
      body: { message: "unauthorized" }
    }
  }
  if (data.imageKey) {
    updatedUser.image = generateS3Url(data.imageKey)
    const { base64 } = await getPlaiceholder(updatedUser.image)
    updatedUser.imageBase64 = base64
  }

  updatedUser = await updateUser(user.id, updatedUser)
  return { status: 200, body: { updatedUser } }
})

export default newProtectedApi({ patch })

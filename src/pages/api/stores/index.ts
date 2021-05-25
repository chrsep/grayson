import { NextApiHandler } from "next"
import { getSession } from "next-auth/client"
import { insertStore } from "@lib/db"
import { exact, string, type, TypeOf } from "io-ts"

const PostStoreBody = type({
  name: string,
  description: string,
  phone: string,
  whatsapp: string,
  address: string,
  city: string,
  province: string,
  postcode: string
})

export type PostStoreBody = TypeOf<typeof PostStoreBody>

const handleStoreApi: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })

  if (session === null) {
    res.status(401).json({ message: "unauthorized" })
    return
  }

  if (req.method === "POST") {
    const body = JSON.parse(req.body)
    if (PostStoreBody.is(body)) {
      const store = await insertStore(body, session.user.email)
      res.status(200).json(store)
    } else {
      res.status(400).json({ message: "bad request" })
    }
  }
}

export default handleStoreApi

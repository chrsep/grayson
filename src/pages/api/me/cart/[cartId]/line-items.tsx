import { NextApiHandler } from "next"
import { newMutationHandler, newPublicApi } from "@lib/rest"
import { number, string, type } from "io-ts"

const PutBody = type({
  productId: string,
  qty: number
})

const put: NextApiHandler = newMutationHandler(PutBody, async (body, session, req, res) => {
  const { cartId } = req.query

  return {
    status: 200,
    body: {}
  }
})

export default newPublicApi({
  put
})

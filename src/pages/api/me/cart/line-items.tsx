import { NextApiHandler } from "next"
import { newMutationHandler, newPublicApi } from "@lib/rest"
import { type } from "io-ts"

const PutBody = type({})

const put: NextApiHandler = newMutationHandler(PutBody, async (body, session, req, res) => {
  return {
    status: 200,
    body: {}
  }
})

export default newPublicApi({
  put
})

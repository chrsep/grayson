import { newProtectedApi } from "@lib/rest"
import { newSignedUploadUrl } from "@lib/storage"
import { NextApiHandler } from "next"
import { v4 } from "uuid"

const post: NextApiHandler = async (req, res) => {
  const objectName = v4()
  const url = await newSignedUploadUrl(objectName)

  res.json({ url })
}

export default newProtectedApi({ post })

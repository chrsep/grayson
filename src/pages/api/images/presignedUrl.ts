import { newProtectedApi } from "@lib/rest"
import { newSignedUploadUrl } from "@lib/file-storage"
import { NextApiHandler } from "next"
import { v4 } from "uuid"

const post: NextApiHandler = async (req, res) => {
  const key = `S3-image/${v4()}`
  const url = await newSignedUploadUrl(key)

  res.status(200).json({ key, url })
}

export default newProtectedApi({ post })

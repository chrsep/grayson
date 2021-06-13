import { newProtectedApi } from "@lib/rest"
import { newSignedUploadUrl } from "@lib/file-storage"
import { NextApiHandler } from "next"
import { v4 } from "uuid"

const post: NextApiHandler = async (req, res) => {
  const objectName = `S3-image/${v4()}`
  const url = await newSignedUploadUrl(objectName)

  res.status(200).json({
    objectName,
    url
  })
}

export default newProtectedApi({ post })

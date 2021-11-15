// Handle image related logic on server side
import { generateS3Url } from "@lib/image-client"
import { getPlaiceholder } from "plaiceholder"

export const getImageMetadata = async (S3Key: string) => {
  const url = generateS3Url(S3Key)
  const { base64 } = await getPlaiceholder(url)
  return { key: S3Key, url, base64 }
}

export const getImagesMetadata = async (keys?: string[]) => {
  if (!keys) return []
  return Promise.all(keys.map(getImageMetadata))
}

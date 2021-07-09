export const uploadImage = async (image: File): Promise<string | null> => {
  const presignedUrl = await fetch("/api/images/presignedUrl", {
    method: "POST"
  })
  if (!presignedUrl.ok) {
    return null
  }

  const { key, url } = await presignedUrl.json()
  const uploadImage = await fetch(url, {
    method: "PUT",
    body: image,
    headers: {
      "x-amz-acl": "public-read" // needed to be the same with acl value set on presigned URL.
    }
  })
  if (!uploadImage.ok) {
    return null
  }

  return key
}

export const generateS3Url = (key: string) => `${process.env.NEXT_PUBLIC_S3_PREFIX}/${key}`

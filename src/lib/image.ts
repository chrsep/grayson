interface Image {
  title: string
  key: string
}
export const uploadImage = async (image: File) => {
  const presignedUrl = await fetch("/api/images/presignedUrl", {
    method: "POST"
  })
  if (!presignedUrl.ok) {
    return null
  }

  const { objectName, url } = await presignedUrl.json()
  const uploadImage = await fetch(url, {
    method: "PUT",
    body: image
  })
  if (!uploadImage.ok) {
    return null
  }

  return objectName
}

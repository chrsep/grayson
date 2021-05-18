import { v2 as cloudinary } from "cloudinary"
import type { RequestHandler } from "@sveltejs/kit"

interface PostCreateUploadLinkOutput {
  timestamp: number
  signature: string
}
export const post: RequestHandler<PostCreateUploadLinkOutput> = () => {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp
    },
    import.meta.env.VITE_CLOUDINARY_SECRET
  )

  return {
    body: {
      timestamp,
      signature
    }
  }
}

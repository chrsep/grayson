import { v2 as cloudinary } from "cloudinary"

export const get = () => {
  cloudinary.utils.api_sign_request(
    {
      timestamp: Math.round(new Date().getTime() / 1000)
    },
    import.meta.env.VITE_CLOUDINARY_SECRET
  )

  return {
    body: {
      uploadUrl: ""
    }
  }
}

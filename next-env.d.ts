/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />
import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      imageBase64?: string | null
    }
  }
}

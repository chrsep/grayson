import { signIn } from "next-auth/client"
import { useRouter } from "next/router"
import { useState } from "react"

const useEmailSignIn = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const emailSignIn = async (email: string) => {
    setLoading(true)
    const result = await signIn("email", { email, callbackUrl: "/", redirect: false })
    if (result?.ok) await router.push("/auth/verify-request")
    setLoading(false)
  }

  return { loading, signIn: emailSignIn }
}

export default useEmailSignIn

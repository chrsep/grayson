// eslint-disable-next-line import/no-extraneous-dependencies
import { AppProps } from "next/app"
import Navbar from "@components/Navbar"
import { useRouter } from "next/router"
import "@fontsource/inria-sans/300.css"
import "@fontsource/inria-sans/400.css"
import "@fontsource/inria-sans/700.css"
import "@fontsource/inria-sans/700-italic.css"
import "@fontsource/noto-sans/index.css"
import "../global.css"

function Grayson({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <div className="bg-gray-100 min-h-screen">
      {!router.asPath.startsWith("/auth") && <Navbar />}
      <Component {...pageProps} />
    </div>
  )
}

export default Grayson

// eslint-disable-next-line import/no-extraneous-dependencies
import App, { AppContext, AppProps } from "next/app"
import { getSession } from "next-auth/client"
import Navbar from "@components/Navbar"
import { useRouter } from "next/router"
import "@fontsource/inria-sans/300.css"
import "@fontsource/inria-sans/400.css"
import "@fontsource/inria-sans/700.css"
import "@fontsource/inria-sans/700-italic.css"
import "@fontsource/noto-sans/index.css"
import "../global.css"
import { SessionContext } from "@lib/session"

function Grayson({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <SessionContext.Provider value={pageProps.session}>
      <div className="bg-gray-100 min-h-screen">
        {!router.asPath.startsWith("/auth") && <Navbar />}
        <Component {...pageProps} />
      </div>
    </SessionContext.Provider>
  )
}

Grayson.getInitialProps = async (ctx: AppContext) => {
  const { pageProps } = await App.getInitialProps(ctx)
  // Uses any  because get session doesn't accept AppContext for some reason, but it works
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session = await getSession(ctx as any)

  return {
    pageProps: {
      ...pageProps,
      session
    }
  }
}

export default Grayson

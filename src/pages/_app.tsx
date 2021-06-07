// eslint-disable-next-line import/no-extraneous-dependencies
import { AppProps } from "next/app"
import { getSession, Provider } from "next-auth/client"
import Navbar from "@components/Navbar"
import { useRouter } from "next/router"
import categories from "../lib/categories"
import "@fontsource/inria-sans/400.css"
import "@fontsource/inria-sans/700.css"
import "@fontsource/noto-sans/index.css"
import "./global.css"

function useGetNavigation() {
  const router = useRouter()
  return [
    { name: "Home", href: "/", current: router.route === "/" },
    ...categories.map(({ slug, name }) => {
      const href = `/categories/${slug}`
      const current = router.asPath.startsWith(href)

      return { name, href, current }
    })
  ]
}

function Grayson({ Component, pageProps }: AppProps) {
  const navigation = useGetNavigation()
  const router = useRouter()

  return (
    <Provider session={pageProps.session}>
      <div className="bg-gray-100 min-h-screen">
        {!router.asPath.startsWith("/auth") && <Navbar navigation={navigation} />}
        <Component {...pageProps} />
      </div>
    </Provider>
  )
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}

export default Grayson

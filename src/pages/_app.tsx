// eslint-disable-next-line import/no-extraneous-dependencies
import "tailwindcss/tailwind.css"
import { AppProps } from "next/app"
import { Provider } from "next-auth/client"
import Navbar from "@components/Navbar"
import { useRouter } from "next/router"
import categories from "../lib/categories"

function useGetNavigation() {
  const router = useRouter()
  return [
    { name: "Semua", href: "/", current: router.route === "/" },
    ...categories.map(({ slug, name }) => {
      const href = `/categories/${slug}`
      const current = router.asPath.startsWith(href)

      return { name, href, current }
    })
  ]
}

function Grayson({ Component, pageProps }: AppProps) {
  const navigation = useGetNavigation()

  return (
    <Provider session={pageProps.session}>
      <Navbar navigation={navigation} />
      <Component {...pageProps} />
    </Provider>
  )
}

export default Grayson

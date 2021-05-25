// eslint-disable-next-line import/no-extraneous-dependencies
import "tailwindcss/tailwind.css"
import { AppProps } from "next/app"
import { getSession, Provider } from "next-auth/client"
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
  const router = useRouter()

  return (
    <Provider session={pageProps.session}>
      {!router.asPath.startsWith("/auth") && <Navbar navigation={navigation} />}
      <div className="bg-gray-100">
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

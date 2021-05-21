// eslint-disable-next-line import/no-extraneous-dependencies
import "tailwindcss/tailwind.css"
import { AppProps } from "next/app"
import { Provider } from "next-auth/client"
import Navbar from "@components/Navbar"

function Grayson({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Navbar navigation={[{ name: "Dashboard", href: "/", current: true }]} />
      <Component {...pageProps} />
    </Provider>
  )
}

export default Grayson

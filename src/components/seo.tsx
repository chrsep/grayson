import Head from "next/head"
import { FC } from "react"

const SEO: FC<{
  title?: string
  description?: string
}> = ({ title, description = "" }) => {
  return (
    <Head>
      <title> {`${title} |`} Sekitarmu.id</title>
      <meta name="description" content={description} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Head>
  )
}

export default SEO

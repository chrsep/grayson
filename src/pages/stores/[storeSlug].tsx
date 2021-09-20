import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import React, { FC } from "react"
import Image from "next/image"
import Hero from "@public/store-cover-placeholder.jpg"
import Icon from "@components/icon"
import Button from "@components/button"
import { Product, ProductImage, Store } from "@prisma/client"
import { findStoreWithProductsBySlug } from "@lib/db"
import ProductItem from "@components/product-item"
import { generateS3Url } from "@lib/image-client"
import Link from "next/link"
import SEO from "@components/seo"

interface Query extends NodeJS.Dict<string> {
  storeSlug: string
}

interface Props {
  store: Store & {
    products: Array<Product & { images: ProductImage[] }>
  }
}

const StoreProfile: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ store }) => {
  return <Heading store={store} />
}

const Heading: FC<{ store: Props["store"] }> = ({ store }) => {
  return (
    <div>
      <SEO title={store.name} description={store.description} />

      <Image
        layout="responsive"
        src={Hero}
        height={200}
        width={1200}
        placeholder="blur"
        objectFit="cover"
        alt=""
      />

      <div className="relative px-4 sm:px-6 lg:px-8 mx-auto max-w-5xl">
        <div className="sm:flex sm:items-end -mt-12 sm:-mt-16 sm:space-x-5">
          <div className="flex overflow-hidden w-24 sm:w-32 h-24 sm:h-32 rounded-full ring-4 ring-white">
            {store.logo ? (
              <Image
                src={generateS3Url(store.logo)}
                width={150}
                height={150}
                className="bg-white"
                objectFit="cover"
                alt={`logo ${store.name}`}
              />
            ) : (
              <Image src={Hero} width={150} height={150} alt="" />
            )}
          </div>

          <div className="sm:flex sm:flex-1 sm:justify-end sm:items-center sm:pb-1 mt-6 sm:space-x-6 sm:min-w-0">
            <div className="sm:hidden md:block flex-1 mt-6 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 truncate">{store.name}</h1>
            </div>

            <div className="flex flex-col sm:flex-row mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href={`tel:${store.phone}`}>
                <Button variant="outline">
                  <Icon src="/icons/phone.svg" className="mr-2 opacity-75" />
                  <span>Telpon</span>
                </Button>
              </Link>

              <Link href={`tel:${store.phone}`}>
                <Button variant="outline">
                  <Icon src="/icons/brand-whatsapp.svg" className="mr-2 opacity-75" />
                  <span>WhatsApp</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden sm:block md:hidden flex-1 mt-6 min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 truncate">{store.name}</h1>
        </div>
      </div>

      <div className="p-4 sm:p-8 mx-auto max-w-5xl">
        <h2 className="my-4 mx-auto max-w-5xl font-ui text-2xl font-bold">Produk</h2>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 sm:gap-x-6 xl:gap-x-8 gap-y-8">
          {store.products.map((product) => (
            <ProductItem key={product.id} product={product} store={store} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({ params }) => {
  const storeSlug = params?.storeSlug
  if (!storeSlug) return { notFound: true }

  const store = await findStoreWithProductsBySlug(storeSlug)
  if (!store) return { notFound: true }

  return {
    props: {
      store
    }
  }
}

export default StoreProfile

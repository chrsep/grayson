import CategoryNavigation from "@components/CategoryNavigation"
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next"
import { findProductBySlug } from "@lib/db"
import Image from "@components/Image"
import { useState } from "react"
import { toIDR } from "@lib/currency"
import Button from "@components/Button"
import Breadcrumbs from "@components/Breadcrumbs"

const ProductPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  product
}) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]?.objectName)

  return (
    <div>
      <CategoryNavigation />

      <main className="md:flex">
        <div className="hidden md:block my-8 ml-8">
          {product.images.map(({ objectName }, index) => {
            const selected = selectedImage === objectName
            return (
              <button
                key={`${objectName}-vertical`}
                type="button"
                className={`mb-4 block leading-3 rounded-xl overflow-hidden focus:outline-none focus:ring-4 focus:ring-indigo-400 ring-offset-2 ring-primary-500 ${
                  selected ? "ring-4" : "ring-0"
                }`}
                onClick={() => setSelectedImage(objectName)}
              >
                <span className="sr-only">Gambar {index}</span>
                <Image src={objectName} layout="fixed" objectFit="cover" width={80} height={80} />
              </button>
            )
          })}
        </div>

        <div className="flex-1">
          <div className="sm:p-8">
            <Image
              src={selectedImage || "/empty-image-placeholder.jpeg"}
              layout="responsive"
              objectFit="contain"
              width={800}
              height={800}
              className="bg-black sm:rounded-xl"
            />

            <div className="flex md:hidden py-4 pl-4 sm:pl-0 overflow-auto">
              {product.images.map(({ objectName }, index) => {
                const selected = selectedImage === objectName
                return (
                  <button
                    key={`${objectName}-horizontal`}
                    type="button"
                    className={`mr-4 block leading-3 rounded-xl overflow-hidden focus:outline-none focus:ring-4 focus:ring-indigo-400 ring-offset-2 ring-primary-500 ${
                      selected ? "ring-4" : "ring-0"
                    }`}
                    onClick={() => setSelectedImage(objectName)}
                  >
                    <span className="sr-only">Gambar {index}</span>
                    <Image
                      src={objectName}
                      layout="fixed"
                      objectFit="cover"
                      width={64}
                      height={64}
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="text-gray-900 flex-1 max-w-2xl">
          <div className="p-4 sm:px-8 md:p-8">
            <Breadcrumbs
              className="my-4"
              breadcrumbs={[
                {
                  href: "/categories/makanan",
                  name: "Makanan",
                  current: true
                }
              ]}
            />

            <h1 className="text-4xl font-light mb-4 mt-8 text-gray-700">{product.name}</h1>
            <h2 className="text-2xl font-bold mb-4">{toIDR(product.price)}</h2>
            <Button className="w-full sm:text-lg py-4 my-4 rounded-xl">
              <img src="/icons/shopping-cart-plus-light.svg" alt="" className="mr-4 opacity-90" />
              Masukan ke keranjang
            </Button>

            <div className="prose sm:prose-sm mt-16">
              <h3>Tentang Produk Ini</h3>
              {product.description.split("\n").map((text) => (
                <p>{text}</p>
              ))}
            </div>
          </div>

          <article className="sm:mx-8 mt-8 bg-white overflow-hidden sm:rounded-xl sm:border sm:shadow-md">
            <Image
              className="h-32 w-full object-cover lg:h-48"
              src="/store-cover-placeholder.jpg"
              layout="responsive"
              width={700}
              height={200}
              alt=""
            />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                <div className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 bg-white">
                  <Image
                    className="rounded-full"
                    layout="responsive"
                    src={product.store.logo || "/empty-logo-placeholder.jpeg"}
                    height={96}
                    width={96}
                    alt=""
                  />
                </div>
                <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                  <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 truncate">
                      {product.store.name}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 pb-6">
              <dl className="grid gap-x-4 gap-y-6 grid-cols-2">
                {/* <div className="col-span-1"> */}
                {/*  <dt className="text-sm font-medium text-gray-500">Telfon</dt> */}
                {/*  <dd className="mt-1 text-sm text-gray-900">{product.store.phone}</dd> */}
                {/* </div> */}

                {/* <div className="col-span-1"> */}
                {/*  <dt className="text-sm font-medium text-gray-500">WhatsApp</dt> */}
                {/*  <dd className="mt-1 text-sm text-gray-900">{product.store.whatsapp}</dd> */}
                {/* </div> */}

                {/* <div className="col-span-2"> */}
                {/*  <dt className="text-sm font-medium text-gray-500">Alamat</dt> */}
                {/*  <dd className="mt-1 text-sm text-gray-900"> */}
                {/*    {`${product.store.address}, ${product.store.city}, ${product.store.province}, ${product.store.postcode}`} */}
                {/*  </dd> */}
                {/* </div> */}

                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Tentang UMKM</dt>
                  <dd
                    className="mt-1 max-w-prose text-sm text-gray-900 space-y-5"
                    dangerouslySetInnerHTML={{ __html: product.store.description }}
                  />
                </div>

                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-500 mb-2">Didirikan oleh</dt>
                  <dd className="flex items-center pb-2">
                    <Image
                      src={product.store.owner.image || "/store-cover-placeholder.jpg"}
                      height={48}
                      width={48}
                      alt=""
                      className="rounded-full"
                    />

                    <p className="ml-4 font-ui">{product.store.owner.name}</p>
                  </dd>
                </div>
              </dl>
            </div>
          </article>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps({
  query: { productSlug }
}: GetServerSidePropsContext<{ productSlug: string }>) {
  const product = await findProductBySlug(productSlug as string)

  // Pass data to the page via props
  return { props: { product } }
}

export default ProductPage

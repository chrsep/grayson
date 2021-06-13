import CategoryNavigation from "@components/CategoryNavigation"
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next"
import { findProductBySlug } from "@lib/db"
import Image from "@components/Image"
import { useState } from "react"
import { toIDR } from "@lib/currency"
import Button from "@components/Button"
import Breadcrumbs from "@components/Breadcrumbs"
import categories from "@lib/categories"

const ProductPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  product,
  category
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
                  href: `/categories/${category.slug}`,
                  name: category.name,
                  current: false
                },
                {
                  href: `/store/${product.store.slug}`,
                  name: product.store.name,
                  current: true
                }
              ]}
            />

            <h1 className="text-4xl font-light mb-4 text-gray-700">{product.name}</h1>
            <h2 className="text-2xl font-bold mb-4">{toIDR(product.price)}</h2>
            <Button className="w-full sm:text-lg py-4 my-4 rounded-xl">
              <img src="/icons/shopping-cart-plus-light.svg" alt="" className="mr-4 opacity-90" />
              Masukan ke keranjang
            </Button>

            <article className="prose sm:prose-sm mt-16">
              <h3>Tentang Produk</h3>
              {product.description.split("\n").map((text) => (
                <p>{text}</p>
              ))}
            </article>

            <article className="mt-16">
              <h3 className="mb-4 font-bold text-lg">Temui sosok dibalik UMKM ini</h3>
              <div className="flex items-center pb-2">
                <div className="flex-shrink-0">
                  <Image
                    src={product.store.owner.image || "/store-cover-placeholder.jpg"}
                    height={96}
                    width={96}
                    alt=""
                    className="rounded-xl"
                  />
                </div>

                <div className="ml-4 text-gray-700 max-w-sm">
                  <p className="font-ui text-3xl font-light mb-1 line-clamp-2">
                    {product.store.owner.name}
                  </p>
                  <p className="font-ui text-md text-sm ml-1">Pendiri dari {product.store.name}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps({
  query: { productSlug }
}: GetServerSidePropsContext<{ productSlug: string }>) {
  const product = await findProductBySlug(productSlug as string)
  const category = categories.find((c) => c.id === product.category)

  // Pass data to the page via props
  return { props: { product, category } }
}

export default ProductPage

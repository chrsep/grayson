import CategoryNavigation from "@components/CategoryNavigation"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import { findCategoryHighlights, findProductBySlug, findStoreHighlights } from "@lib/db"
import Image from "@components/Image"
import { useState } from "react"
import { toIDR } from "@lib/currency"
import Button from "@components/Button"
import Breadcrumbs from "@components/Breadcrumbs"
import categories, { findCategoryById } from "@lib/categories"
import ProductList from "@components/ProductList"
import type { Category } from "@prisma/client"
import Divider from "@components/Divider"
import { Await } from "@lib/ts-utils"

const ProductPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  product,
  category,
  storeProducts,
  categoryProducts
}) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]?.objectName)

  return (
    <div>
      <CategoryNavigation />

      <main className="">
        <div className="md:flex">
          <div className="hidden md:block my-8 ml-8 min-w-[60px]">
            {product.images.map(({ objectName }, index) => {
              const selected = selectedImage === objectName
              return (
                <button
                  key={`${objectName}-vertical`}
                  type="button"
                  className={`mb-4 block leading-3 rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-400 ring-offset-2 ring-primary-500 hover:opacity-100 ${
                    selected ? "ring-2 opacity-100" : "ring-0 opacity-60"
                  }`}
                  onClick={() => setSelectedImage(objectName)}
                >
                  <span className="sr-only">Gambar {index}</span>
                  <Image src={objectName} layout="fixed" objectFit="cover" width={60} height={60} />
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
                width={400}
                height={300}
                className="bg-black sm:rounded-xl"
              />

              <div className="flex md:hidden py-4 pl-4 sm:pl-1 overflow-auto">
                {product.images.map(({ objectName }, index) => {
                  const selected = selectedImage === objectName
                  return (
                    <button
                      key={`${objectName}-horizontal`}
                      type="button"
                      className={`mr-3 block leading-3 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-400 ring-offset-2 ring-primary-500 hover:opacity-100 ${
                        selected ? "ring-2 opacity-100" : "ring-0 opacity-60"
                      }`}
                      onClick={() => setSelectedImage(objectName)}
                    >
                      <span className="sr-only">Gambar {index}</span>
                      <Image
                        src={objectName}
                        layout="fixed"
                        objectFit="cover"
                        width={40}
                        height={40}
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
              <Button
                className="w-full sm:text-lg py-4 my-4 rounded-xl"
                onClick={async () => {
                  await fetch("/api/me/cart/line-items", {
                    method: "PUT",
                    credentials: "include",
                    body: JSON.stringify({
                      productId: product.id,
                      qty: 1
                    })
                  })
                }}
              >
                <img src="/icons/shopping-cart-plus-light.svg" alt="" className="mr-4 opacity-90" />
                Masukan ke keranjang
              </Button>

              {product.description && (
                <article className="prose sm:prose-sm mt-16">
                  <h3>Tentang Produk</h3>
                  {product.description.split("\n").map((text) => (
                    <p>{text}</p>
                  ))}
                </article>
              )}

              <article className="mt-16">
                <h3 className="mb-4 font-bold text-lg text-gray-700">Temui pendiri UMKM ini</h3>
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
                    <p className="font-ui text-md text-sm ml-1">
                      Pendiri dari {product.store.name}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        <Divider />

        <div className="mt-4 sm:mt-8 pb-4 sm:pb-8">
          <h2 className="text-2xl px-4 sm:px-8 leading-tight mb-4">
            Produk lainnya dari <b>{product.store.name}</b>
          </h2>
          <ProductList
            products={storeProducts}
            containerClassName="px-4 sm:px-8 grid-cols-2 md:!grid-cols-4 lg:!grid-cols-6"
          />
        </div>

        {categoryProducts.length > 0 && (
          <>
            <Divider />

            <div className="mt-8">
              <h2 className="font-bold text-2xl px-4 sm:px-8 leading-tight mb-4">
                Produk lain dalam kategori <b>{category.name}</b>
              </h2>
              <ProductList
                products={categoryProducts}
                containerClassName="px-4 sm:px-8 grid-cols-2 sm:!grid-cols-6"
              />
            </div>
          </>
        )}
      </main>
    </div>
  )
}

interface Props {
  category: typeof categories[0]
  product: Exclude<Await<ReturnType<typeof findProductBySlug>>, null>
  storeProducts: Await<ReturnType<typeof findStoreHighlights>>
  categoryProducts: Await<ReturnType<typeof findCategoryHighlights>>
}

interface Query extends NodeJS.Dict<string> {
  productSlug: string
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
  query: { productSlug }
}) => {
  const product = await findProductBySlug(productSlug as string)
  if (!product) return { notFound: true }

  const category = findCategoryById(product.category)

  return {
    props: {
      product,
      category,
      storeProducts: await findStoreHighlights(product.store.slug, product.id),
      categoryProducts: await findCategoryHighlights(category?.id as Category, product.id)
    }
  }
}

export default ProductPage

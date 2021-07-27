import CategoryNavigation from "@components/CategoryNavigation"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import { findCategoryHighlights, findProductBySlug, findStoreHighlights } from "@lib/db"
import { useEffect, useState } from "react"
import { toIDR } from "@lib/currency"
import Breadcrumbs from "@components/Breadcrumbs"
import categories, { findCategoryById } from "@lib/categories"
import ProductList from "@components/ProductList"
import type { Category } from "@prisma/client"
import { Await } from "@lib/ts-utils"
import Button from "@components/Button"
import Icon from "@components/Icon"
import Image from "next/image"
import PlaceholderImage from "@public/empty-image-placeholder.jpeg"
import { useCart } from "@lib/cart"

const ProductPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  product,
  category,
  storeProducts,
  categoryProducts
}) => {
  const cart = useCart()
  const firstImage = product.images[0]
  const [selectedImage, setSelectedImage] = useState(firstImage)

  useEffect(() => {
    setSelectedImage(firstImage)
  }, [firstImage])

  return (
    <div>
      <CategoryNavigation />

      <main className="mx-auto max-w-7xl">
        <div className="md:flex">
          <div className="flex-1">
            <div key={selectedImage?.key || "empty"} className="sm:p-8 md:pr-0">
              {selectedImage ? (
                <Image
                  src={selectedImage.url}
                  layout="responsive"
                  objectFit="contain"
                  width={400}
                  height={400}
                  className="bg-black sm:rounded-2xl"
                  placeholder="blur"
                  blurDataURL={selectedImage.base64}
                />
              ) : (
                <Image
                  src={PlaceholderImage}
                  layout="responsive"
                  objectFit="contain"
                  width={400}
                  height={400}
                  className="bg-black sm:rounded-2xl"
                  placeholder="blur"
                />
              )}

              {product.images.length > 0 && (
                <div className="flex overflow-auto py-4 pl-4 sm:pl-1">
                  {product.images.map((image, index) => {
                    const selected = selectedImage?.key === image.key
                    return (
                      <button
                        key={`${image.key}-horizontal`}
                        type="button"
                        className={`mr-3 block leading-3 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-400 ring-offset-2 ring-primary-500 hover:opacity-100 ${
                          selected ? "ring-2 opacity-100" : "ring-0 opacity-60"
                        }`}
                        onClick={() => setSelectedImage(image)}
                      >
                        <span className="sr-only">Gambar {index}</span>
                        <Image
                          src={image.url}
                          layout="fixed"
                          objectFit="cover"
                          width={60}
                          height={60}
                          placeholder="blur"
                          blurDataURL={image.base64}
                        />
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 max-w-2xl text-gray-900">
            <div className="p-4 md:p-8 sm:px-8">
              <Breadcrumbs
                className="my-4"
                breadcrumbs={[
                  {
                    href: `/stores/${product.store.slug}`,
                    name: product.store.name,
                    current: false
                  },
                  {
                    href: `/categories/${category.slug}`,
                    name: category.name,
                    current: true
                  }
                ]}
              />

              <h1 className="mb-4 text-4xl font-light text-gray-700">{product.name}</h1>

              <h2 className="mb-4 text-2xl font-bold">{toIDR(product.price)}</h2>

              <Button
                className="py-3 my-6 w-full rounded-xl"
                onClick={() => {
                  cart.addItem({ productId: product.id, storeId: product.storeId, qty: 1 })
                }}
              >
                <Icon src="/icons/plus.svg" className="mr-4 !bg-white" />
                Masukan ke catatan
              </Button>

              {product.description && (
                <article className="mt-8 prose sm:prose-sm">
                  <h3>Tentang Produk</h3>
                  {product.description.split("\n").map((text) => (
                    <p>{text}</p>
                  ))}
                </article>
              )}

              <article className="pt-6 mt-8 border-t">
                <h3 className="mb-4 text-lg font-bold">Temui pendiri UMKM ini</h3>

                <div className="flex items-center pb-2">
                  <div>
                    <Image
                      src={product.store.owner.image || "/store-cover-placeholder.jpg"}
                      height={80}
                      width={80}
                      alt=""
                      className="rounded-full"
                      objectFit="cover"
                    />
                  </div>
                  <div className=" overflow-hidden ml-4 max-w-sm">
                    <p className="ml-1 font-ui text-xl line-clamp-2">{product.store.owner.name}</p>
                    <p className="ml-1 font-ui text-sm text-gray-700">
                      Pendiri dari {product.store.name}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        {storeProducts.length > 0 && (
          <div className="px-4 sm:px-8 pb-16 sm:mt-4 border-t">
            <h2 className="py-8 text-2xl leading-tight">
              Produk lain <b>{product.store.name}</b>
            </h2>

            <ProductList
              products={storeProducts}
              containerClassName="!p-0 grid-cols-2 md:!grid-cols-4 lg:!grid-cols-6"
            />
          </div>
        )}

        {categoryProducts.length > 0 && (
          <div className="px-4 sm:px-8 pb-16 border-t">
            <h2 className="py-8 text-2xl leading-tight">
              Produk dalam kategori <b>{category.name}</b>
            </h2>

            <ProductList
              products={categoryProducts}
              containerClassName="!p-0 grid-cols-2 md:!grid-cols-4 lg:!grid-cols-6 "
            />
          </div>
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

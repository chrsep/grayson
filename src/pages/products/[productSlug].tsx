import CategoryNavigation from "@components/category-navigation"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import {
  findAllProductSlugs,
  findCategoryHighlights,
  findProductBySlug,
  findStoreHighlights
} from "@lib/db"
import React, { useEffect, useState } from "react"
import { toIDR } from "@lib/currency"
import Breadcrumbs from "@components/breadcrumbs"
import categories, { findCategoryById } from "@lib/categories"
import ProductList from "@components/product-list"
import type { Category } from "@prisma/client"
import { Await } from "@lib/ts-utils"
import Button from "@components/button"
import Icon from "@components/icon"
import Image from "next/image"
import PlaceholderImage from "@public/empty-image-placeholder.jpeg"
import { useCart } from "@lib/cart"
import UserImagePlaceholder from "@public/store-cover-placeholder.jpg"
import clsx from "clsx"
import SEO from "@components/seo"

const ProductPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  product,
  category,
  storeProducts,
  categoryProducts
}) => {
  const incrementQty = useCart((state) => state.incrementQty)
  const firstImage = product.images[0]
  const [selectedImage, setSelectedImage] = useState(firstImage)

  useEffect(() => {
    setSelectedImage(firstImage)
  }, [firstImage])

  return (
    <div>
      <SEO title={product.name} description={product.description} />

      <CategoryNavigation />

      <main className="mx-auto max-w-7xl">
        <div className="md:flex">
          <div className="flex-1">
            <div key={product.id} className="sm:p-8 md:pr-0">
              {selectedImage ? (
                <Image
                  src={selectedImage.url}
                  layout="responsive"
                  objectFit="contain"
                  width={900}
                  height={900}
                  className="bg-black sm:rounded-2xl"
                  placeholder="blur"
                  blurDataURL={selectedImage.base64}
                />
              ) : (
                <Image
                  src={PlaceholderImage}
                  layout="responsive"
                  objectFit="contain"
                  width={900}
                  height={900}
                  className="bg-black sm:rounded-2xl"
                  placeholder="blur"
                />
              )}

              {product.images.length > 0 && (
                <div className="flex overflow-auto py-4 pb-[29px] pl-4 sm:pl-1">
                  {product.images.map((image, index) => {
                    const selected = selectedImage?.key === image.key
                    return (
                      <button
                        key={image.key}
                        type="button"
                        onClick={() => setSelectedImage(image)}
                        className={clsx(
                          "block overflow-hidden mr-3 w-10 md:w-12 h-10 md:h-12 leading-3 rounded-lg focus:ring-2 ring-primary-500 focus:ring-indigo-400 ring-offset-2 hover:opacity-100 transition-opacity focus:outline-none",
                          selected ? "ring-2 opacity-100" : "ring-0 opacity-60"
                        )}
                      >
                        <span className="sr-only">Gambar {index}</span>
                        <Image
                          src={image.url}
                          layout="fixed"
                          objectFit="cover"
                          width={61}
                          height={61}
                          placeholder="blur"
                          blurDataURL={image.base64}
                          className="rounded-lg"
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
                onClick={() => incrementQty(product.storeId, product.id)}
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

              {product.store.owner.name && (
                <article className="pt-6 mt-8 border-t">
                  <h3 className="mb-4 text-lg font-bold">Temui pendiri UMKM ini</h3>

                  <div className="flex items-center pb-2">
                    <div>
                      {product.store.owner.image ? (
                        <Image
                          src={product.store.owner.image}
                          height={72}
                          width={72}
                          alt=""
                          className="rounded-full"
                          objectFit="cover"
                          placeholder={product.store.owner.imageBase64 ? "blur" : "empty"}
                          blurDataURL={product.store.owner.imageBase64 || ""}
                        />
                      ) : (
                        <Image
                          src={UserImagePlaceholder}
                          height={72}
                          width={72}
                          alt=""
                          className="rounded-full"
                          objectFit="cover"
                          placeholder="blur"
                        />
                      )}
                    </div>
                    <div className=" overflow-hidden ml-4 max-w-sm">
                      <p className="ml-1 font-ui text-xl line-clamp-2">
                        {product.store.owner.name}
                      </p>
                      <p className="ml-1 font-ui text-sm text-gray-700">
                        Pendiri dari {product.store.name}
                      </p>
                    </div>
                  </div>
                </article>
              )}
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

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  const product = await findProductBySlug(params?.productSlug as string)
  if (!product) return { notFound: true }

  const category = findCategoryById(product.category)

  return {
    revalidate: 1,
    props: {
      product,
      category,
      storeProducts: await findStoreHighlights(product.store.slug, product.id),
      categoryProducts: await findCategoryHighlights(category?.id as Category, product.id)
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await findAllProductSlugs()
  return {
    paths: slugs.map(({ slug }) => ({ params: { productSlug: slug } })),
    fallback: "blocking" // See the "fallback" section below
  }
}

export default ProductPage

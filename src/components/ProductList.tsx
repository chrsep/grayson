import Image from "next/image"
import Link from "@components/Link"
import { toIDR } from "@lib/currency"
import type { Product, ProductImage, Store } from "@prisma/client"
import { FC } from "react"
import emptyImagePlaceholder from "@public/empty-image-placeholder.jpeg"

const ProductList: FC<{
  products: Array<Product & { images: ProductImage[]; store: Store }>
  containerClassName?: string
}> = ({ containerClassName, products }) => (
  <ul
    className={`grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 xl:gap-x-8 sm:p-8 p-4 ${containerClassName}`}
  >
    {products.map(({ id, images, name, price, store, slug }) => (
      <Link href={`/products/${slug}`}>
        <li key={id} className="relative">
          <div className="group block w-full aspect-w-4 aspect-h-3 rounded-xl bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden border bg-white">
            <div className="object-cover pointer-events-none group-hover:opacity-75">
              {images[0]?.key ? (
                <Image
                  layout="responsive"
                  width={400}
                  height={302}
                  objectFit="cover"
                  src={images[0].url}
                  placeholder="blur"
                  blurDataURL={images[0].base64}
                />
              ) : (
                <Image
                  layout="responsive"
                  width={400}
                  height={302}
                  objectFit="cover"
                  src={emptyImagePlaceholder}
                  placeholder="blur"
                />
              )}
            </div>
            <span className="sr-only">Lihat details untuk {name}</span>
          </div>
          <p className="font-ui mt-2 block text-gray-700 line-clamp-2 mb-1 line-clamp-2 leading-tight">
            {name}
          </p>
          <p className="block text-sm text-gray-900 font-bold">{toIDR(price)}</p>
          <p className="font-ui block text-sm text-gray-700">{store.name}</p>
        </li>
      </Link>
    ))}
  </ul>
)
export default ProductList

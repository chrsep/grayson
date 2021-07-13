import { FC } from "react"
import { Product, ProductImage, Store } from "@prisma/client"
import Link from "next/link"
import Image from "next/image"
import emptyImagePlaceholder from "@public/empty-image-placeholder.jpeg"
import { toIDR } from "@lib/currency"

const ProductItem: FC<{
  store: Store
  product: Product & { images: ProductImage[] }
}> = ({ product: { images, name, price, slug }, store }) => (
  <li className="relative">
    <Link href={`/products/${slug}`}>
      <a className="group">
        <div className="block overflow-hidden w-full bg-gray-100 rounded-xl border focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 aspect-w-4 aspect-h-3">
          <div className="object-cover hover:opacity-80 pointer-events-none">
            {images?.[0]?.key ? (
              <Image
                layout="responsive"
                width={400}
                height={302}
                objectFit="cover"
                src={images?.[0]?.url}
                placeholder="blur"
                blurDataURL={images?.[0]?.base64}
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

        <Link href={`/products/${slug}`}>
          <a className="block mt-2 mb-1 font-ui leading-tight text-gray-700 group-hover:text-black line-clamp-2">
            {name}
          </a>
        </Link>
      </a>
    </Link>

    <Link href={`/stores/${store.slug}`}>
      <a className=" block mb-2 font-ui text-sm leading-tight text-gray-700 hover:text-primary-700 cursor-pointer">
        {store.name}
      </a>
    </Link>

    <Link href={`/products/${slug}`}>
      <a className="block text-sm font-bold leading-tight text-gray-900">{toIDR(price)}</a>
    </Link>
  </li>
)

export default ProductItem

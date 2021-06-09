import Image from "@components/Image"
import Link from "@components/Link"
import { toIDR } from "@lib/currency"
import { Product, ProductImage, Store } from "@prisma/client"
import { FC } from "react"

const ProductList: FC<{ products: Array<Product & { images: ProductImage[]; store: Store }> }> = ({
  products
}) => (
  <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-8 xl:gap-x-8 sm:p-4">
    {products.map(({ id, images, name, price, store, slug }) => (
      <Link href={`/products/${slug}`}>
        <li key={id} className="relative">
          <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden border bg-white">
            <div className="object-cover pointer-events-none group-hover:opacity-75">
              <Image
                layout="responsive"
                width={200}
                height={140}
                src={images[0]?.objectName || "/empty-image-placeholder.jpeg"}
                objectFit="cover"
                alt=""
              />
            </div>
            <span className="sr-only">Lihat details untuk {name}</span>
          </div>
          <p className="font-ui mt-2 block text-sm text-gray-700 line-clamp-2 mb-2">{name}</p>
          <p className="block text-sm text-gray-900 font-bold">{toIDR(price)}</p>
          <p className="font-ui block text-sm text-gray-700">{store.name}</p>
        </li>
      </Link>
    ))}
  </ul>
)
export default ProductList

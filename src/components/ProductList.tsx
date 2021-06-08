import Image from "@components/Image"
import Link from "@components/Link"
import { toIDR } from "@lib/currency"
import { Product, ProductImage, Store } from "@prisma/client"
import { FC } from "react"

const ProductList: FC<{ products: Array<Product & { images: ProductImage[]; store: Store }> }> = ({
  products
}) => (
  <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-8 xl:gap-x-8">
    {products.map(({ id, images, name, price, store }) => (
      <li key={id} className="relative">
        <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
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
          <Link href="/" className="absolute inset-0 focus:outline-none">
            <span className="sr-only">Lihat details untuk {name}</span>
          </Link>
        </div>
        <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
          {name}
        </p>
        <p className="block text-sm font-medium text-gray-500 pointer-events-none">
          {toIDR(price)}
        </p>
        <p className="block text-sm font-medium text-gray-500 pointer-events-none">{store.name}</p>
      </li>
    ))}
  </ul>
)
export default ProductList

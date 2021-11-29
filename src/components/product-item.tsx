import { FC } from "react"
import { Product, ProductImage, Store } from "@prisma/client"
import Link from "next/link"
import Image from "next/image"
import emptyImagePlaceholder from "@public/empty-image-placeholder.jpeg"
import { toIDR } from "@lib/currency"
import { generateS3Url } from "@lib/image-client"

const ProductItem: FC<{
  store: Store
  product: Product & { images: ProductImage[] }
}> = ({ product: { images, name, price, slug }, store }) => (
  <li className="relative">
    <Link href={`/products/${slug}`}>
      <a className="group">
        <div className="flex overflow-hidden w-full bg-gray-100 rounded-xl border focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 aspect-w-1 aspect-h-1">
          <div className="hover:opacity-80 pointer-events-none">
            <ItemImage productName={name} image={images?.[0]} />
          </div>
          <span className="sr-only">Lihat details untuk {name}</span>
        </div>
      </a>
    </Link>

    <Link href={`/products/${slug}`}>
      <a className="group">
        <p className="block mt-3 mb-2 font-ui font-bold leading-tight text-gray-900 group-hover:text-black line-clamp-2">
          {name}
        </p>
      </a>
    </Link>

    <Link href={`/products/${slug}`}>
      <a className="block leading-tight text-gray-900">{toIDR(price)}</a>
    </Link>

    <Link href={`/stores/${store.slug}`}>
      <a className="group flex items-center mt-2 mb-2 cursor-pointer">
        {store.logo && (
          <div className="flex overflow-hidden flex-shrink-0 mr-2 w-6 h-6 rounded-full">
            <Image
              src={generateS3Url(store.logo)}
              width={40}
              height={40}
              alt="/"
              objectFit="cover"
            />
          </div>
        )}

        <p className="h-6 font-ui leading-tight text-gray-500 hover:text-primary-700 truncate bg-gray-100 transition">
          {store.name}
        </p>
      </a>
    </Link>
  </li>
)

const ItemImage: FC<{
  productName: string
  image: ProductImage
}> = ({ image, productName }) => {
  if (image) {
    return (
      <Image
        layout="responsive"
        width={500}
        height={500}
        objectFit="cover"
        src={image.url}
        placeholder="blur"
        blurDataURL={image.base64}
        sizes="(min-width: 1536px) 15vw, (min-width: 1280px) 20vw, (min-width: 1024px) 30vw, (min-width: 640px) 40vw, 60vw"
        alt={productName}
      />
    )
  }

  return (
    <Image
      layout="responsive"
      width={500}
      height={505}
      objectFit="cover"
      src={emptyImagePlaceholder}
      placeholder="blur"
      sizes="(min-width: 1536px) 15vw, (min-width: 1280px) 20vw, (min-width: 1024px) 30vw, (min-width: 640px) 40vw, 60vw"
      alt={productName}
    />
  )
}

export default ProductItem

import type { Product, ProductImage, Store } from "@prisma/client"
import { FC } from "react"
import ProductItem from "@components/ProductItem"

const ProductList: FC<{
  products: Array<Product & { images: ProductImage[]; store: Store }>
  containerClassName?: string
}> = ({ containerClassName, products }) => (
  <ul
    className={`grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 xl:gap-x-8 sm:p-8 p-4 ${containerClassName}`}
  >
    {products.map(({ store, ...product }) => (
      <ProductItem key={product.id} product={product} store={store} />
    ))}
  </ul>
)

export default ProductList

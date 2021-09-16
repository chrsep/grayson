import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next"
import { findProductsByNameStoreOrOwner } from "@lib/db"
import ProductList from "@components/product-list"

const SearchPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  query,
  products
}) => (
  <main>
    <h1 className="py-6 px-4 sm:px-8 my-6 text-2xl font-bold text-gray-900 border-b">
      Hasil pencarian dari <br />
      <i className="text-primary-400">&rdquo;{query}&rdquo;</i>
    </h1>

    {products.length === 0 && (
      <p className="px-4 md:px-8 text-gray-700">Tidak ada produk ditemukan</p>
    )}

    <ProductList products={products} />
  </main>
)

export async function getServerSideProps({ query: { q } }: GetServerSidePropsContext) {
  const products = await findProductsByNameStoreOrOwner(q as string)

  return { props: { query: q, products } }
}

export default SearchPage

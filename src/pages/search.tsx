import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next"
import { findProductsByNameStoreOrOwner } from "@lib/db"
import ProductList from "@components/ProductList"

const SearchPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  query,
  products
}) => (
  <main>
    <h1 className="font-bold text-2xl text-gray-900 px-4 sm:px-8 py-6 my-6 border-b">
      Hasil pencarian dari <br />
      <i className="text-primary-400">&rdquo;{query}&rdquo;</i>
    </h1>

    {products.length === 0 && <p className="text-gray-700">Tidak ada produk ditemukan</p>}

    <ProductList products={products} />
  </main>
)

export async function getServerSideProps({ query: { q } }: GetServerSidePropsContext) {
  const products = await findProductsByNameStoreOrOwner(q as string)

  return { props: { query: q, products } }
}

export default SearchPage

import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next"
import Divider from "@components/Divider"
import { findProductsByNameStoreOrOwner } from "@lib/db"
import ProductList from "@components/ProductList"

const SearchPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  query,
  products
}) => (
  <main className="p-4 sm:pt-8">
    <h1 className="font-bold text-2xl pt-4 text-gray-900">
      Hasil pencarian dari <br />
      <i className="text-primary-400">&rdquo;{query}&rdquo;</i>
    </h1>
    <Divider />

    {products.length === 0 && <p className="text-gray-700">Tidak ada produk ditemukan</p>}

    <ProductList products={products} />
  </main>
)

export async function getServerSideProps({ query: { q } }: GetServerSidePropsContext) {
  const products = await findProductsByNameStoreOrOwner(q as string)

  return { props: { query: q, products } }
}

export default SearchPage

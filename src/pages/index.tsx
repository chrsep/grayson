import { findProductsWithPrimaryImagesAndStore } from "@lib/db"
import { InferGetServerSidePropsType, NextPage } from "next"
import ProductList from "@components/ProductList"
import React from "react"
import CategoryNavigation from "@components/CategoryNavigation"

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ products }) => {
  return (
    <div>
      <CategoryNavigation />

      <main>
        <div className="p-4">
          <ProductList products={products} />
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const products = await findProductsWithPrimaryImagesAndStore()

  // Pass data to the page via props
  return { props: { products } }
}

export default Home

import { findProductsWithPrimaryImagesAndStore } from "@lib/db"
import { InferGetStaticPropsType, NextPage } from "next"
import ProductList from "@components/ProductList"
import React from "react"
import CategoryNavigation from "@components/CategoryNavigation"

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ products }) => {
  return (
    <div>
      <CategoryNavigation />

      <main>
        <ProductList products={products} />
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const products = await findProductsWithPrimaryImagesAndStore()

  // Pass data to the page via props
  return {
    props: { products },
    revalidate: 5
  }
}

export default Home

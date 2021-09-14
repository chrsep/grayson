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

export const getStaticProps = async () => {
  const products = await findProductsWithPrimaryImagesAndStore()

  // Pass data to the page via props
  return {
    revalidate: 5,
    props: {
      products
    }
  }
}

export default Home

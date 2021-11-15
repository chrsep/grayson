import { findProductsWithPrimaryImagesAndStore } from "@lib/db"
import { InferGetServerSidePropsType, NextPage } from "next"
import ProductList from "@components/product-list"
import React from "react"

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ products }) => {
  return (
    <div>
      <ProductList products={products} />
    </div>
  )
}

export async function getServerSideProps() {
  const products = await findProductsWithPrimaryImagesAndStore()

  // Pass data to the page via props
  return { props: { products } }
}

export default Home

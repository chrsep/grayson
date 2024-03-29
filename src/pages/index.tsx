import { findProductsWithPrimaryImagesAndStore } from "@lib/db"
import { InferGetStaticPropsType, NextPage } from "next"
import ProductList from "@components/product-list"
import React from "react"
import CategoryNavigation from "@components/category-navigation"
import SEO from "@components/seo"

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ products }) => {
  return (
    <div>
      <SEO
        title="Temukan UMKM di sekitar-mu"
        description="Sekitarmu membantu-mu untuk meng-eksplor bisnis UMKM di sekitar-mu"
      />
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
    revalidate: 1,
    props: {
      products
    }
  }
}

export default Home

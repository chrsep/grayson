import { InferGetServerSidePropsType, NextPage } from "next"
import React from "react"

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ test }) => {
  return <div>{test}</div>
}

export async function getServerSideProps() {
  return { props: { test: "empty" } }
}

export default Home

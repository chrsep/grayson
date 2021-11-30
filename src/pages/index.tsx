import { InferGetServerSidePropsType, NextPage } from "next";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useTest = () => {
  return useSWR("/api/test", fetcher);
};

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({ test }) => {
    const { data, error } = useTest();
    return (
      <div>
        <div>From API: {data?.msg}</div>
        <div>From SSR: {test}</div>
      </div>
    );
  };

export async function getServerSideProps() {
  return { props: { test: "Hello SSR" } };
}

export default Home;

import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>NFT-ID</title>
        <meta
          name="description"
          content="Put your web2 reputation onto chain"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;

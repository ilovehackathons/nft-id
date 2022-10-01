import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import { ContextProvider } from "../contexts/ContextProvider";
import { AppBar } from "../components/AppBar";
import { ContentContainer } from "../components/ContentContainer";
import { Footer } from "../components/Footer";
import Notifications from "../components/Notification";
import { SessionProvider } from "next-auth/react";

require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

const App: FC<AppProps<{ session: any }>> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>NFT-ID</title>
      </Head>

      <ContextProvider>
        <div className="flex flex-col h-screen">
          <Notifications />
          <AppBar />
          <ContentContainer>
            <SessionProvider session={session}>
              <Component {...pageProps} />
            </SessionProvider>
          </ContentContainer>
          <Footer />
        </div>
      </ContextProvider>
    </>
  );
};

export default App;

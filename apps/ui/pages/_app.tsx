import { AppProps } from "next/app";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Web3ReactProvider } from "@web3-react/core";
import ProgressBar from "nextjs-progressbar";
import { getLibrary } from "@cassavaland/sdk";
import { AlertModel } from "@cassavaland/uikits";
import {
  ApplicationProvider,
  LocaleProvider,
  ThemeProvider,
} from "../contexts";
import MainLayout from "../components/Layouts/Main";
import { GlobalStyle } from "../globalStyle";
import "@reach/dialog/styles.css";

// const Web3ProviderNetwork = createWeb3ReactRoot(NETWORK_CONTEXT_NAME);

const ModalProvider = dynamic(() => import("../components/Modals"), {
  ssr: false,
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content="The best and user frendly multi blockchain NFT platform in the world."
        />
        <title>CassavaLand, multi blockchain NFT platform</title>
      </Head>
      <LocaleProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          {/* <Web3ProviderNetwork getLibrary={getLibrary}> */}
          <ApplicationProvider>
            <ThemeProvider>
              <MainLayout>
                <>
                  <ProgressBar />
                  <Component {...pageProps} />
                </>
              </MainLayout>
              <AlertModel />
              <GlobalStyle />
              <ModalProvider />
            </ThemeProvider>
          </ApplicationProvider>
          {/* </Web3ProviderNetwork> */}
        </Web3ReactProvider>
      </LocaleProvider>
    </>
  );
}

export default CustomApp;

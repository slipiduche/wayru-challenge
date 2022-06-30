import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/index.scss";
import "../fonts/line-awesome-1.3.0/css/line-awesome.css";
import { useEffect } from "react";
import { accountsChanged, chainChanged, verifyNetwork } from "../wallet";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    //console.log("useEffect");

    verifyNetwork();

    window.ethereum.on("accountsChanged", accountsChanged);
    window.ethereum.on("chainChanged", chainChanged);
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;

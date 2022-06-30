import type { AppProps } from 'next/app'
import '../styles/globals.css'
import "../styles/index.scss";
import "../fonts/line-awesome-1.3.0/css/line-awesome.css";


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

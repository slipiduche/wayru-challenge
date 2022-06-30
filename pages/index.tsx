import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wayru challenge</title>
        <meta name="description" content="the best purse manager app" />
        <link rel="icon" href="/logoWayru.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Login with <a href="https://metamask.io/">Metamask!</a>
        </h1>
      </main>
       
      <footer className={styles.footer}>
        <a
          href="https://www.wayru.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" Wayru"}
          {/* <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span> */}
        </a>
      </footer>
    </div>
  );
};

export default Home;

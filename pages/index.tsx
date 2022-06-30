import type { NextPage } from "next";
import Head from "next/head";
import ButtonPrimary from "../shared/Button/ButtonPrimary";

const Home: NextPage = () => {
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <Head>
        <title>Wayru challenge</title>
        <meta name="description" content="the best purse manager app" />
        <link rel="icon" href="/logoWayru.png" />
      </Head>

      <h1>
        Login with <a href="https://metamask.io/">Metamask!</a>
      </h1>
      <ButtonPrimary sizeClass="px-4 py-2 sm:px-5">Connect</ButtonPrimary>

      <footer className="text-sm">
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

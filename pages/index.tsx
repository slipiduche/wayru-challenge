import type { NextPage } from "next";
import Head from "next/head";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import { connectHandler } from "../wallet";

const Home: NextPage = () => {
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <Head>
        <title>Wayru challenge</title>
        <meta name="description" content="the best purse manager app" />
        <link rel="icon" href="/logoWayru.png" />
      </Head>
      <div className={`nc-MainNav2 relative z-10 ${"onTop "}`}>
        <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
          <h1>
            Login with <a href="https://metamask.io/">Metamask!</a>
          </h1>
          <ButtonPrimary
            sizeClass="px-4 py-2 sm:px-5"
            onClick={() => {
              connectHandler();
            }}
          >
            Connect Wallet{" "}
          </ButtonPrimary>
        </div>
      </div>
      {/* <footer className="nc-Footer relative py-20 lg:pt-32 lg:pb-28 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-4 lg:gap-x-10 ">
          <a
            href="https://www.wayru.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" Wayru"}
          </a>
        </div>
      </footer> */}
    </div>
  );
};

export default Home;

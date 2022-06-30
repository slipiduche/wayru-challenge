import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { compose } from "redux";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import { BalanceContainer } from "../components/BalanceContainer";
import {
  accountsChanged,
  chainChanged,
  connectHandler,
  verifyNetwork,
} from "../store/wallet";
const logoImg = "/logoWayruText.webp";

const Home: NextPage<{
  chainChangedProps;
  accountsChangedProps;
  state_wallet;
  state_error;
}> = ({
  chainChangedProps,
  accountsChangedProps,
  state_wallet,
  state_error,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    //console.log("useEffect");

    verifyNetwork(dispatch);
    if (window) {
      window.ethereum.on("chainChanged", chainChangedProps);
      window.ethereum.on("accountsChanged", accountsChangedProps);
    }
  }, []);
  useEffect(() => {
    console.log(state_wallet);
    console.log(state_wallet.balance.indexOf("."));
  }, [state_wallet, state_error]);
  const [walletConnected, setwalletConnected] = useState(false);
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <Head>
        <title>Wayru challenge</title>
        <meta name="description" content="the best purse manager app" />
        <link rel="icon" href="/logoWayru.png" />
      </Head>
      <div className={`nc-MainNav2 relative z-10 ${"onTop "}`}>
        <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
          <NextLink
            href="/"
            className={`ttnc-logo inline-block text-primary-6000`}
          >
            <a>
              <div>
                {<img className={`block max-h-12`} src={logoImg} alt="Logo" />}
              </div>
            </a>
          </NextLink>
          <h1>Purse Manager</h1>
          <ButtonPrimary
            loading={state_wallet.connecting}
            sizeClass="px-4 py-2 sm:px-5"
            onClick={() => {
              connectHandler(dispatch);
            }}
          >
            {state_wallet.connected ? "Connected" : "Connect Wallet"}
          </ButtonPrimary>
        </div>
      </div>
      <BalanceContainer state_wallet={state_wallet}></BalanceContainer>
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
function mapStateToProps(state) {
  return {
    state_wallet: state.wallet,
    state_error: state.error,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    chainChangedProps: (chain) => dispatch(chainChanged(chain)),
    accountsChangedProps: (newAccount) => dispatch(accountsChanged(newAccount)),
  };
}
export default compose(connect(mapStateToProps, mapDispatchToProps))(Home);

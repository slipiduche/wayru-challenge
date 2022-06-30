import { ethers } from "ethers";
import { jsonAbi } from "./jsonAbi";
import {
  setInvalidChain,
  setConnecting,
  setAccount,
  walletConnected,
} from "./walletActions";
import { set_error } from "../error/errorActions";
import { setWalletBalance, setWalletContractBalance } from "./walletActions";

// const contractAddress = "0x286cbAD20522fE35355a6E2BB5c117AFe796f5b8"; // address of the  contract
const contractAddress = "0x6F4b31111E0670aD45354EF9f9DC2cC8BA6e18CE"; // address of the contract

export const verifyNetwork = async (dispatch) => {
  const web3 = window.ethereum;
  if (web3) {
    const res = await web3.request({ method: "eth_chainId" });
    if (res == "0x3") {
      dispatch(setInvalidChain(false));
      // store.wallet.setInvalidChain(false);
    } else {
      dispatch(setInvalidChain(true));
      // store.wallet.setInvalidChain(true);
    }
  } else {
    // if no web3 then MetaMask is not installed
    alert(
      "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
    );
  }
};
export const switchNetwork = async (dispatch) => {
  const web3 = window.ethereum;
  if (web3) {
    try {
      // check if the chain to connect to is installed
      console.log("switching to robsten");
      await web3.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x3" }], // chainId must be in hexadecimal numbers
      });
      // store.wallet.setInvalidChain(false);
      dispatch(setInvalidChain(false));
    } catch (error: any) {
      console.error(error);
    }
  } else {
    // if no web3 then MetaMask is not installed
    alert(
      "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
    );
  }
};
export const connectHandler = async (dispatch) => {
  const web3 = window.ethereum;
  console.log("connectHandler");
  if (web3) {
    dispatch(setConnecting(true));

    try {
      const res = await web3.request({
        method: "eth_requestAccounts",
      });
      console.log(res[0]);
      dispatch(setAccount(res[0]));
      const balance = await web3.request({
        method: "eth_getBalance",
        params: [res[0].toString(), "latest"],
      });

      dispatch(setWalletBalance(ethers.utils.formatEther(balance)));
      dispatch(setConnecting(false));
      dispatch(walletConnected(true));

      getContractBalance(dispatch);
    } catch (err) {
      console.error(err);
      dispatch(set_error("There was a problem connecting to MetaMask"));
      dispatch(setConnecting(false));
      dispatch(walletConnected(false));
    }
  } else {
    console.log("error");
    dispatch(set_error("Install MetaMask"));
    dispatch(setConnecting(false));
    dispatch(walletConnected(false));
  }
};
export const accountsChanged =
  (newAccount: string | string[]) => async (dispatch) => {
    const web3 = window.ethereum;

    if (typeof newAccount == "string") {
      dispatch(setAccount(newAccount));
    } else {
      dispatch(setAccount(newAccount[0]));
    }

    await connectHandler(dispatch);

    try {
      const balance = await web3.request({
        method: "eth_getBalance",
        params: [newAccount.toString(), "latest"],
      });

      dispatch(setWalletBalance(ethers.utils.formatEther(balance)));
      dispatch(setConnecting(false));
      dispatch(walletConnected(true));
    } catch (err) {
      dispatch(setConnecting(false));
      dispatch(walletConnected(false));
      // console.error(err);
      // store.wallet.setErrorMessage("There was a problem connecting to MetaMask");
    }
  };

export const chainChanged = (chain: string | string[]) => async (dispatch) => {
  const web3 = window.ethereum;
  if (chain == "0x3") {
    //robsten network
    // store.wallet.setInvalidChain(false);
  } else {
    // store.wallet.setErrorMessage("Invalid network please switch to robsten");
    // store.wallet.setInvalidChain(true);
    // store.wallet.setAccount("");
    // store.wallet.setBalance("0");
    // store.wallet.setConnecting(false);
    // store.wallet.setConnected(false);
  }
};

export const getContractBalance = async (dispatch) => {
  const web3 = window.ethereum;
  // JSON ABI of the token contract
  const provider = new ethers.providers.Web3Provider(web3);
  //const tokenAddress = store.wallet.account; // address of which you want to get the token balance
  const contract = new ethers.Contract(
    contractAddress,
    jsonAbi,
    provider.getSigner()
  );
  const balance = await contract.getBalance();
  console.log(balance);
  const stringBalance = (
    parseFloat(balance.toString()) / 1000000000000000000
  ).toString();
  dispatch(setWalletContractBalance(stringBalance));
  console.log("balance:", stringBalance);
};

export const withdraw = async (value) => {
  //console.log(answers);

  //console.log(answersList);
  const web3 = window.ethereum;
  // JSON ABI of the token contract
  const provider = new ethers.providers.Web3Provider(web3);

  const contract = new ethers.Contract(
    contractAddress,
    jsonAbi,
    provider.getSigner()
  );
  const result = await contract.withdraw(value);
  console.log("withdraw:", result);
};

import { ethers } from "ethers";
import { jsonAbi } from "./jsonAbi";

const contractAddress = "0x286cbAD20522fE35355a6E2BB5c117AFe796f5b8"; // address of the token contract

export const verifyNetwork = async () => {
  const web3 = window.ethereum;
  if (web3) {
    const res = await web3.request({ method: "eth_chainId" });
    if (res == "0x3") {
      // store.wallet.setInvalidChain(false);
    } else {
      // store.wallet.setInvalidChain(true);
    }
  } else {
    // if no web3 then MetaMask is not installed
    alert(
      "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
    );
  }
};
export const switchNetwork = async () => {
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
export const connectHandler = async () => {
  const web3 = window.ethereum;
  console.log("connectHandler");
  if (web3) {
    // store.wallet.setConnecting(true);
    try {
      const res = await web3.request({
        method: "eth_requestAccounts",
      });

      // store.wallet.setAccount(res[0]);
      // store.wallet.setConnecting(false);
      // store.wallet.setConnected(true);
      getBalance();
    } catch (err) {
      console.error(err);
      // store.wallet.setErrorMessage(
      //   "There was a problem connecting to MetaMask"
      // );
      // store.wallet.setConnecting(false);
      // store.wallet.setConnected(false);
    }
  } else {
    console.log("error");
    // store.wallet.setConnecting(false);
    // store.wallet.setConnected(false);
    // store.wallet.setErrorMessage("Install MetaMask");
  }
};
export const accountsChanged = async (newAccount: string | string[]) => {
  const web3 = window.ethereum;

  if (typeof newAccount == "string") {
    // store.wallet.setAccount(newAccount);
  } else {
    // store.wallet.setAccount(newAccount[0]);
  }

  await connectHandler();

  try {
    const balance = await web3.request({
      method: "eth_getBalance",
      params: [newAccount.toString(), "latest"],
    });
    // store.wallet.setBalance(ethers.utils.formatEther(balance));
    // store.wallet.setConnecting(false);
    // store.wallet.setConnected(true);
  } catch (err) {
    // store.wallet.setConnecting(false);
    // store.wallet.setConnected(false);
    // console.error(err);
    // store.wallet.setErrorMessage("There was a problem connecting to MetaMask");
  }
};

export const chainChanged = (chain: string | string[]) => {
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

export const getBalance = async () => {
  const web3 = window.ethereum;
  // JSON ABI of the token contract
  const provider = new ethers.providers.Web3Provider(web3);
  //const tokenAddress = store.wallet.account; // address of which you want to get the token balance
  const contract = new ethers.Contract(contractAddress, jsonAbi, provider);
  const balance = await contract.getBalance();
  const stringBalance = (
    parseFloat(balance.toString()) / 1000000000000000000
  ).toString();
  console.log("balance:", stringBalance);
  // store.wallet.setQuizBalance(stringBalance);
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

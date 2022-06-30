import * as types from "./walletTypes";

export function walletConnected(payload) {
  //console.log('really connected')
  return {
    type: types.WALLET_CONNECTED,
    payload: payload,
  };
}
export function walletDisconnected(payload) {
  //console.log('really connected')
  return {
    type: types.DISCONNECT_WALLET,
    payload: payload,
  };
}

export function setAccount(payload) {
  return {
    type: types.SET_WALLET_ACCOUNT,
    payload: payload,
  };
}

export function setWalletBalance(payload) {
  return {
    type: types.SET_WALLET_BALANCE,
    payload: payload,
  };
}
export function setWalletContractBalance(payload) {
  return {
    type: types.SET_WALLET_CONTRACT_BALANCE,
    payload: payload,
  };
}

export function setConnecting(payload) {
  return {
    type: types.SET_WALLET_LOADING,
    payload: payload,
  };
}
export function setInvalidChain(payload) {
  return {
    type: types.SET_INVALID_CHAIN,
    payload: payload,
  };
}

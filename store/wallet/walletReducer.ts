import * as types from "./walletTypes";

let walletobj = {
  connecting: false,
  connected: false,
  balance: 0,
  contractBalance: 0,
  errorMessage: "",
  account: "",
  invalidChain: false,
};

export default function walletReducer(state = walletobj, { type, payload }) {
  switch (type) {
    case types.WALLET_CONNECTED:
      return {
        ...state,
        connected: true,
        connecting: false,
        invalidChain: false,
      };
    case types.DISCONNECT_WALLET:
      return {
        ...walletobj,
      };

    case types.SET_WALLET_LOADING:
      return {
        ...state,
        connecting: payload,
      };
    case types.SET_WALLET_BALANCE:
      return {
        ...state,
        balance: payload,
      };
    case types.SET_WALLET_CONTRACT_BALANCE:
      return {
        ...state,
        contractBalance: payload,
      };
    case types.SET_WALLET_ACCOUNT:
      return {
        ...state,
        account: payload,
      };
    case types.SET_INVALID_CHAIN:
      return {
        ...state,
        invalidChain: payload,
      };

    default:
      return state;
  }
}

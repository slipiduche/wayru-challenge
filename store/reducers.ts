import { combineReducers } from "redux";

import walletReducer from "./wallet/walletReducer";

import errorReducer from "./error/errorReducer";


export default combineReducers({
  wallet: walletReducer,
  
  error: errorReducer,
  
});

import type { AppProps } from "next/app";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import { Provider, useDispatch } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import "../styles/globals.css";
import "../styles/index.scss";
import "../fonts/line-awesome-1.3.0/css/line-awesome.css";

import reducers from "../store/reducers";
const middleware = [reduxThunk];
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

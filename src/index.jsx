import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import configureStore from "./store";
import RouterMap from "./router";
import FastClick from "fastclick";
import registerServiceWorker from "./registerServiceWorker";
import  "./common/scss/index.scss";

const history = createHistory();
const store = configureStore({ history });
// Create a history of your choosing (we're using a browser history in this case)
// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
FastClick.attach(document.body);
registerServiceWorker();

// Now you can dispatch navigation actions from anywhere!

ReactDOM.render(
  <Provider store={store}>
    {/* ConnectedRouter will use the store from Provider automatically */}
    <RouterMap history={history} />
  </Provider>,
  document.getElementById("root")
);
// store.dispatch(push('/foo'))
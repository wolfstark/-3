import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createHistory from "history/createHashHistory";
import configureStore from "./store";
import RouterMap from "./router";
import FastClick from "fastclick";
import registerServiceWorker from "./registerServiceWorker";
import "./common/scss/index.scss";

document.documentElement.style.fontSize = `${document.documentElement
  .clientWidth / 7.5}px`;

const history = createHistory({
  basename: process.env.NODE_ENV === "development" ? "" : "/music-player"
});
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

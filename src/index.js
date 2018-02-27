import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Router, Route } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./rootReducer";
import authorize from "./actions/userActions";
import initialPosts from "./actions/postsActions";
import history from "./history";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.user) {
  const user = JSON.parse(localStorage.user);
  store.dispatch(authorize(user));
}

if (localStorage.posts) {
  const posts = JSON.parse(localStorage.posts);
  store.dispatch(initialPosts(posts));
}

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();

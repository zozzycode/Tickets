import React from "react";
import ReactDOM from "react-dom";
import "./styles/materialize.css";
import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducer";
import { Provider } from "react-redux";
import App from "./components/App";
import thunk from "redux-thunk";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

const css = require('./components/scss/main.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { initState } from "./components/redux/store";

import configureStore from "./components/redux/store.js";

let initialState = initState();

let store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

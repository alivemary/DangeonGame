const css = require('./app.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/App';

import configureStore from "./components/redux/store.js";

let initialState = {
  gameWidth: (window.screen.availWidth>600) ? window.screen.availWidth-200 : 400,
  gameHeight: (window.screen.availHeight>600) ? window.screen.availHeight-300 : 300,
  dungeon: [],
  rooms: [],
  player: {
    position: {x: 0, y: 0},
    health: 100,
    weapon: "stick",
    attack: 7,
    level: 0,
    nextlevel: 60
  }
};

let store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

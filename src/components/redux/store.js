import {createStore} from "redux";
import reducer from "./reducer.js";

export default function configureStore (initialState = {gameWidth: 400, gameHeight: 300}){
  return createStore(reducer, initialState);
}

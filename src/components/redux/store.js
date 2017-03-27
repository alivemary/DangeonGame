import {createStore} from "redux";
import reducer from "./reducer.js";

export default function configureStore (
  initialState = {
    gameWidth: 400,
    gameHeight: 300,
    dungeon: [],
    rooms: []
  }
){
  return createStore(reducer, initialState);
}

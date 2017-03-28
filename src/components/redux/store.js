import {createStore} from "redux";
import reducer from "./reducer.js";

export default function configureStore (
  initialState = {
    gameWidth: 400,
    gameHeight: 300,
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
  }
){
  return createStore(reducer, initialState);
}

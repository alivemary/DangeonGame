import {
  ADD_LINE_TO_DUNGEON,
  ADD_ROOM_TO_DUNGEON,
  ADD_CORRIDORS_TO_DUNGEON,
  PUT_PLAYER,
  PUT_BOSS
} from "./actionTypes";

export default function reducer(state, action){
  switch (action.type) {
    case ADD_LINE_TO_DUNGEON:
      return {
        ...state,
        dungeon: [...state.dungeon, action.newLine]
      }

    case ADD_ROOM_TO_DUNGEON:
      return {
        ...state,
        dungeon: state.dungeon.map((element, i) =>{
          let newRoom = action.newRoom;
          if (i>newRoom.x-newRoom.length && i<=newRoom.x+newRoom.length) {
            return element.map ((el, j) => {
              if (j>newRoom.y-newRoom.length && j<=newRoom.y+newRoom.length) {
                return "SPACE";
              }
              return el;
            });
          }
          return element;
        }),
        rooms: [...state.rooms, {x: action.newRoom.x, y: action.newRoom.y}]
      }

    case ADD_CORRIDORS_TO_DUNGEON:
      return {
        ...state,
        dungeon: state.dungeon.map((element, i) => {
          let minX = Math.min(action.way.room1.x, action.way.room2.x);
          let maxX = Math.max(action.way.room1.x, action.way.room2.x);
          let minY = Math.min(action.way.room1.y, action.way.room2.y);
          let maxY = Math.max(action.way.room1.y, action.way.room2.y);
          if (i>=minX && i<=maxX){
            return element.map((el, j) => {
              if (j === action.way.room1.y){
                return "SPACE";
              }
              if (i === action.way.room2.x && j>minY && j<=maxY) {
                return "SPACE";
              }
              return el;
            });
          }
          return element;
        })
      }

    case PUT_PLAYER:
      return {
        ...state,
        player: {
          ...state.player,
          position: {x: action.position.x, y: action.position.y}
        }
      }
  case PUT_BOSS:
    return {
      ...state,
      boss: {
        ...state.boss,
        position: {x: action.position.x, y: action.position.y}
      }
    }

    default:
      return state;
  }
}

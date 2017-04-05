import {
  ADD_LINE_TO_DUNGEON,
  ADD_ROOM_TO_DUNGEON,
  ADD_CORRIDORS_TO_DUNGEON,
  PUT_PLAYER,
  PUT_BOSS,
  ATTACK_ENEMY,
  PUT_STAFF
} from "./actionTypes";

const initialState = {
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
  },
  boss: {
    position: {x: 0, y: 0},
    health: 500,
    attack: 20
  },
  staff: []
};

export default function reducer(state = initialState, action){
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
          let newRoom = action.position;
          if (i>newRoom.x-action.length && i<=newRoom.x+action.length) {
            return element.map ((el, j) => {
              if (j>newRoom.y-action.length && j<=newRoom.y+action.length) {
                return "SPACE";
              }
              return el;
            });
          }
          return element;
        }),
        rooms: [...state.rooms, {x: action.position.x, y: action.position.y}]
      }

    case ADD_CORRIDORS_TO_DUNGEON:
      let minX = Math.min(action.way.room1.x, action.way.room2.x);
      let maxX = Math.max(action.way.room1.x, action.way.room2.x);
      let minY = Math.min(action.way.room1.y, action.way.room2.y);
      let maxY = Math.max(action.way.room1.y, action.way.room2.y);
      return {
        ...state,
        dungeon: state.dungeon.map((element, i) => {
          if (i>=minX && i<=maxX){
            return element.map((el, j) => {
              if (j === action.way.room1.y && i !== action.way.room1.x){
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
        },
        dungeon: state.dungeon.map((element, i) => {

            return element.map((el, j) => {
              if (el === "PLAYER") {
                return "SPACE";
              }
              if (j === action.position.y && i === action.position.x) {
                return "PLAYER";
              }
              return el;
            });

          return element;
        })
      }

    case PUT_BOSS:
      return {
        ...state,
        boss: {
          ...state.boss,
          position: {x: action.position.x, y: action.position.y}
        },
        dungeon: state.dungeon.map((element, i) => {
          if (i === action.position.x) {
            return element.map((el, j) => {
              if (j === action.position.y) {
                return "BOSS";
              }
              return el;
            });
          }
          return element;
        })
      }

    case ATTACK_ENEMY:
      return {
        ...state,
        boss: {
          ...state.boss,
          health: state.boss.health - state.player.attack
        },
        player: {
          ...state.player,
          health: state.player.health - state.boss.attack
        }
      }

    case PUT_STAFF:
      let id = state.staff.length;
      return {
        ...state,
        staff: [...state.staff, {
                  id: id,
                  kind: action.kind,
                  position: action.position
               }],
        dungeon: state.dungeon.map((element, i) => {
          if (i === action.position.x) {
            return element.map((el, j) => {
              if (j === action.position.y) {
                return id;
              }
              return el;
            });
          }
          return element;
        })
      }

    default:
      return state;
  }
}

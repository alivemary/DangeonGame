export default function reducer(state, action){
  switch (action.type) {
    case "ADD_LINE_TO_DUNGEON":
      return {
        ...state,
        dungeon: [...state.dungeon, action.newLine]
      }
    case "ADD_ROOM_TO_DUNGEON":
      return {
        ...state,
        dungeon: state.dungeon.map((element, i) =>{
          if (i>action.newRoom.x-action.newRoom.length && i<=action.newRoom.x+action.newRoom.length) {
            for (let j=action.newRoom.y-action.newRoom.length; j<action.newRoom.y+action.newRoom.length; j++){
      				element[j]=1;
      			}
          }
          return element;
        })
      }
    default:
      return state;
  }
}

import {
  ADD_LINE_TO_DUNGEON,
  ADD_ROOM_TO_DUNGEON,
  ADD_CORRIDORS_TO_DUNGEON,
  PUT_PLAYER,
  PUT_BOSS
} from "./actionTypes";


export function addLineToDungeon(newLine){
    return {
      type: ADD_LINE_TO_DUNGEON,
      newLine
    }
}

export function addRoomToDungeon(newRoom){
    return {
      type: ADD_ROOM_TO_DUNGEON,
      newRoom
    }
}

export function addCorridorsToDungeon(way){
  return {
    type: ADD_CORRIDORS_TO_DUNGEON,
    way
  }
}

export function putPlayer(position) {
   return {
     type: PUT_PLAYER,
     position
   }
 }

 export function putBoss(position) {
    return {
      type: PUT_BOSS,
      position
    }
  }

export function addLineToDungeon(newLine){
    return {
      type: "ADD_LINE_TO_DUNGEON",
      newLine
    }
}

export function addRoomToDungeon(newRoom){
    return {
      type: "ADD_ROOM_TO_DUNGEON",
      newRoom
    }
}

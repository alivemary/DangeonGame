import {
  addLineToDungeon,
  addRoomToDungeon,
  addCorridorsToDungeon,
  putPlayer,
  putBoss,
  putStaff,
  attackEnemy
} from '../actions';

describe('actions', () => {
  describe('addLineToDungeon', () => {
    it('should have a type of "ADD_LINE_TO_DUNGEON"', () => {
      expect(addLineToDungeon().type).toEqual('ADD_LINE_TO_DUNGEON');
    });
    it('should pass on the newLine we pass in', () => {
      let newLine = [0, 0, 1];
      expect(addLineToDungeon(newLine).newLine).toEqual(newLine);
    });
  });
  describe('addRoomToDungeon', () => {
    it('should have a type of "ADD_ROOM_TO_DUNGEON"', () => {
      expect(addRoomToDungeon().type).toEqual('ADD_ROOM_TO_DUNGEON');
    });
    it('should pass on the position we pass in', () => {
      let position = {x: 13, y: 22};
      let length = 3;
      expect(addRoomToDungeon(position, length).position).toEqual(position);
      expect(addRoomToDungeon(position, length).length).toEqual(length);
    });
  });
  describe('addCorridorsToDungeon', () => {
    it('should have a type of "ADD_CORRIDORS_TO_DUNGEON"', () => {
      expect(addCorridorsToDungeon().type).toEqual('ADD_CORRIDORS_TO_DUNGEON');
    });
    it('should pass on the way we pass in', () => {
      let way = {x: 13, y: 22};
      expect(addCorridorsToDungeon(way).way).toEqual(way);
    });
  });
  describe('putPlayer', () => {
    it('should have a type of "PUT_PLAYER"', () => {
      expect(putPlayer().type).toEqual('PUT_PLAYER');
    });
    it('should pass on the position we pass in', () => {
      let position = {x: 13, y: 22};
      expect(putPlayer(position).position).toEqual(position);
    });
  });
  describe('putBoss', () => {
    it('should have a type of "PUT_BOSS"', () => {
      expect(putBoss().type).toEqual('PUT_BOSS');
    });
    it('should pass on the position we pass in', () => {
      let position = {x: 13, y: 22};
      expect(putBoss(position).position).toEqual(position);
    });
  });
  describe('putStaff', () => {
    it('should have a type of "PUT_STAFF"', () => {
      expect(putStaff().type).toEqual('PUT_STAFF');
    });
    it('should pass on the position we pass in', () => {
      let position = {x: 13, y: 22};
      let kind = "medicine";
      expect(putStaff(kind, position).position).toEqual(position);
      expect(putStaff(kind, position).kind).toEqual(kind);
    });
  });
  describe('attackEnemy', () => {
    it('should have a type of "ATTACK_ENEMY"', () => {
      expect(attackEnemy().type).toEqual('ATTACK_ENEMY');
    });
  });
});

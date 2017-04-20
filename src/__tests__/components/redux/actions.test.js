import {
  addDungeon,
  addRoomToDungeon,
  addCorridorsToDungeon,
  putPlayer,
  putBoss,
  putStaff,
  attackEnemy,
  changeHealth,
  changeWeapon,
  addLevel,
  removeEnemy
} from '../actions';

describe('actions', () => {
  describe('addDungeon', () => {
    it('should have a type of "ADD_DUNGEON"', () => {
      expect(addDungeon().type).toEqual('ADD_DUNGEON');
    });
    it('should pass on the dungeon we pass in', () => {
      let dungeon = [0, 0, 1];
      expect(addDungeon(dungeon).dungeon).toEqual(dungeon);
    });
  });
  describe('addRoomToDungeon', () => {
    it('should have a type of "ADD_ROOM_TO_DUNGEON"', () => {
      expect(addRoomToDungeon().type).toEqual('ADD_ROOM_TO_DUNGEON');
    });
    it('should pass on the position we pass in', () => {
      let position = { x: 13, y: 22 };
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
      let way = { x: 13, y: 22 };
      expect(addCorridorsToDungeon(way).way).toEqual(way);
    });
  });
  describe('putPlayer', () => {
    it('should have a type of "PUT_PLAYER"', () => {
      expect(putPlayer().type).toEqual('PUT_PLAYER');
    });
    it('should pass on the position we pass in', () => {
      let position = { x: 13, y: 22 };
      expect(putPlayer(position).position).toEqual(position);
    });
  });
  describe('putBoss', () => {
    it('should have a type of "PUT_BOSS"', () => {
      expect(putBoss().type).toEqual('PUT_BOSS');
    });
    it('should pass on the position we pass in', () => {
      let id = 5;
      expect(putBoss(id).id).toEqual(id);
    });
  });
  describe('putStaff', () => {
    it('should have a type of "PUT_STAFF"', () => {
      expect(putStaff().type).toEqual('PUT_STAFF');
    });
    it('should pass on the staff we pass in', () => {
      const staff = ["medicine", 3, false];
      expect(putStaff(staff).staff).toEqual(staff);
    });
  });
  describe('attackEnemy', () => {
    it('should have a type of "ATTACK_ENEMY"', () => {
      expect(attackEnemy().type).toEqual('ATTACK_ENEMY');
    });
  });
  describe('changeHealth', () => {
    it('should have a type of "CHANGE_HEALTH"', () => {
      expect(changeHealth().type).toEqual('CHANGE_HEALTH');
    });
    it('should pass on the position we pass in', () => {
      let position = { x: 13, y: 22 };
      expect(changeHealth(position).position).toEqual(position);
    });
  });
  describe('changeWeapon', () => {
    it('should have a type of "CHANGE_WEAPON"', () => {
      let position = { x: 13, y: 22 };
      let kind = 'something';
      expect(changeWeapon(position, kind).type).toEqual('CHANGE_WEAPON');
    });
    it('should pass on the position we pass in', () => {
      let position = { x: 13, y: 22 };
      let kind = 'something';
      expect(changeWeapon(position, kind).position).toEqual(position);
    });
    it('should pass on the kind we pass in', () => {
      let position = { x: 13, y: 22 };
      let kind = 'something';
      expect(changeWeapon(position, kind).kind).toEqual(kind);
    });
  });
  describe('addLevel', () => {
    it('should have a type of "ADD_LEVEL"', () => {
      expect(addLevel().type).toEqual('ADD_LEVEL');
    });
  });
  describe('removeEnemy', () => {
    it('should have a type of "REMOVE_ENEMY"', () => {
      expect(removeEnemy().type).toEqual('REMOVE_ENEMY');
    });
    it('should pass on the position we pass in', () => {
      let position = { x: 13, y: 22 };
      expect(removeEnemy(position).position).toEqual(position);
    });
  });
});

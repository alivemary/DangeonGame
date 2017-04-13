import reducer from '../reducer';
import * as types from '../actionTypes';
import { initState } from "../store";

describe(reducer, () => {

  let state;

  beforeEach(() => {
    state = initState();
  });

  describe("Reducers", () => {
    it('should return the initial state', function () {
      const expected = state;
      expect(reducer(undefined, {})).toEqual(expected);
    });

    it('should handle ADD_DUNGEON', () => {
      const dungeon = ["WALL", "SPACE", 14];
      const expected = { ...state, dungeon: dungeon };
      expect(
        reducer(state, {
          type: types.ADD_DUNGEON,
          dungeon: ["WALL", "SPACE", 14]
        })
      ).toEqual(expected);
    });

    it('should handle ADD_ROOM_TO_DUNGEON', () => {
      const position = { x: 3, y: 2 };
      const length = 2;
      const initDungeon = [
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
      ];
      const dungeon = [
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL']
      ];
      const newState = { ...state, dungeon: initDungeon };
      const expected = { ...newState, dungeon: dungeon, rooms: [position] };
      expect(
        reducer(newState, {
          type: types.ADD_ROOM_TO_DUNGEON,
          position: position,
          length: length
        })
      ).toEqual(expected);
    });

    it('should handle ADD_CORRIDORS_TO_DUNGEON', () => {
      const room1 = { x: 4, y: 4 };
      const room2 = { x: 1, y: 1 };
      const initDungeon = [
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'SPACE', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'SPACE', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
      ];
      const dungeon = [
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'SPACE', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'SPACE', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'SPACE', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
      ];
      const newState = { ...state, dungeon: initDungeon };
      const expected = { ...newState, dungeon: dungeon };
      expect(
        reducer(newState, {
          type: types.ADD_CORRIDORS_TO_DUNGEON,
          way: { room1, room2 },
        })
      ).toEqual(expected);
    });

    it('should handle PUT_PLAYER', () => {
      const position = { x: 3, y: 2 };
      const initDungeon = [
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'SPACE', 'PLAYER', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL']
      ];
      const dungeon = [
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'PLAYER', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL']
      ];
      const newState = { ...state, dungeon: initDungeon };
      const expected = { ...newState, dungeon: dungeon, player: { ...state.player, position: position } };
      expect(
        reducer(newState, {
          type: types.PUT_PLAYER,
          position: position,
        })
      ).toEqual(expected);
    });

    it('should handle PUT_BOSS', () => {
      const position = { x: 3, y: 2 };
      const initDungeon = [
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL']
      ];
      const dungeon = [
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'BOSS', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL']
      ];
      const newState = { ...state, dungeon: initDungeon };
      const expected = { ...newState, dungeon: dungeon, boss: { ...state.boss, position: position } };
      expect(
        reducer(newState, {
          type: types.PUT_BOSS,
          position: position,
        })
      ).toEqual(expected);
    });

    it('should handle PUT_STAFF', () => {
      const position = { x: 3, y: 2 };
      const kind = "medicine";
      const initDungeon = [
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL']
      ];
      const dungeon = [
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 1, 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL'],
        ['WALL', 'SPACE', 'SPACE', 'SPACE', 'SPACE', 'WALL']
      ];
      const newState = { ...state, dungeon: initDungeon };
      const expected = { ...newState, dungeon: dungeon, staff: [{ id: 1, kind: "medicine", position: position }] };
      expect(
        reducer(newState, {
          type: types.PUT_STAFF,
          kind: kind,
          position: position,
        })
      ).toEqual(expected);
    });

    it('should handle ATTACK_ENEMY', () => {
      const player = { ...state.player, attack: 12, health: 100 };
      const boss = { ...state.boss, attack: 30, health: 300 };
      const newState = { ...state, player: player, boss: boss };
      const expectedPlayer = { ...state.player, attack: 12, health: 70 };
      const expectedBoss = { ...state.boss, attack: 30, health: 288 };
      const expected = { ...state, player: expectedPlayer, boss: expectedBoss };
      expect(
        reducer(newState, {
          type: types.ATTACK_ENEMY,
        })
      ).toEqual(expected);
    });

    it('should handle CHANGE_HEALTH', () => {
      const position = { x: 12, y: 10 };
      const staff = [{ id: 1, kind: "medicine", position: position }];
      const player = { ...state.player, health: 100 };
      const newState = { ...state, staff: staff, player: player };
      const expected = { ...state, staff: [], player: { ...state.player, health: 140 } };
      expect(
        reducer(newState, {
          type: types.CHANGE_HEALTH,
          position: position
        })
      ).toEqual(expected);
    });

    it('should handle CHANGE_ATTACK', () => {
      const position = { x: 12, y: 10 };
      const staff = [{ id: 1, kind: "weapon", position: position }];
      const newState = { ...state, staff: staff, player: { ...state.player, attack: 17 } };
      const expected = { ...state, staff: [], player: { ...state.player, attack: 27 } };
      expect(
        reducer(newState, {
          type: types.CHANGE_ATTACK,
          position: position
        })
      ).toEqual(expected);
    });
  })

});

import reducer from '../reducer';
import { fromJS } from 'immutable';
import { toEqualImmutable } from 'jest-immutable-matchers';
import * as types from '../actionTypes';

describe(reducer, () => {

  let state;

  beforeEach(() => {
    state = {
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
    }
  });

  it('should return the initial state', function() {
    const expected = state;
    expect(reducer(undefined, {})).toEqual(expected);
  });

  it('should handle ADD_LINE_TO_DUNGEON', () => {
    const dungeon = [["WALL", "SPACE", 14]];
    const expected = {...state, dungeon: dungeon};
    expect(
      reducer(state, {
        type: types.ADD_LINE_TO_DUNGEON,
        newLine: ["WALL", "SPACE", 14]
      })
    ).toEqual(expected);
  });

  it('should handle ADD_ROOM_TO_DUNGEON', () => {
    const position = {x: 3, y: 2};
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
    const newState = {...state, dungeon: initDungeon};
    const expected = {...newState, dungeon: dungeon, rooms: [position]};
    expect(
      reducer(newState, {
        type: types.ADD_ROOM_TO_DUNGEON,
        position: position,
        length: length
      })
    ).toEqual(expected);
  });
});

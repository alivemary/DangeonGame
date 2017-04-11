import reducer from '../reducer';
import * as types from '../actionTypes';
import { initState } from "../store";

describe(reducer, () => {

  let state;

  beforeEach(() => {
    state = initState();
  });

  it('should return the initial state', function() {
    const expected = state;
    expect(reducer(undefined, {})).toEqual(expected);
  });

  it('should handle ADD_DUNGEON', () => {
    const dungeon = ["WALL", "SPACE", 14];
    const expected = {...state, dungeon: dungeon};
    expect(
      reducer(state, {
        type: types.ADD_DUNGEON,
        dungeon: ["WALL", "SPACE", 14]
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

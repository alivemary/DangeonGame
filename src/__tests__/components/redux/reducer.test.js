import reducer from "../reducer";
import * as types from "../actionTypes";
import { initState } from "../store";

describe("reducer", () => {
  let state;

  beforeEach(() => {
    state = initState();
  });

  it("should return the initial state", function() {
    const expected = state;
    expect(reducer(undefined, {})).toEqual(expected);
  });

  it("should handle ADD_DUNGEON", () => {
    const dungeon = ["WALL", "SPACE", 14];
    const expected = { ...state, dungeon: dungeon };
    expect(
      reducer(state, {
        type: types.ADD_DUNGEON,
        dungeon: ["WALL", "SPACE", 14]
      })
    ).toEqual(expected);
  });

  it("should handle ADD_ROOM_TO_DUNGEON", () => {
    const position = { x: 3, y: 2 };
    const length = 2;
    const initDungeon = [
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"]
    ];
    const dungeon = [
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
      ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
      ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
      ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"]
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

  it("should handle ADD_CORRIDORS_TO_DUNGEON", () => {
    const room1 = { x: 4, y: 4 };
    const room2 = { x: 1, y: 1 };
    const initDungeon = [
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "SPACE", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "WALL", "WALL", "WALL", "SPACE", "WALL"],
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"]
    ];
    const dungeon = [
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
      ["WALL", "WALL", "WALL", "WALL", "SPACE", "WALL"],
      ["WALL", "WALL", "WALL", "WALL", "SPACE", "WALL"],
      ["WALL", "WALL", "WALL", "WALL", "SPACE", "WALL"],
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"]
    ];
    const newState = { ...state, dungeon: initDungeon };
    const expected = { ...newState, dungeon: dungeon };
    expect(
      reducer(newState, {
        type: types.ADD_CORRIDORS_TO_DUNGEON,
        way: { room1, room2 }
      })
    ).toEqual(expected);
  });

  it("should handle PUT_PLAYER", () => {
    const position = { x: 3, y: 2 };
    const initDungeon = [
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "SPACE", "PLAYER", "SPACE", "SPACE", "WALL"],
      ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
      ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
      ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"]
    ];
    const dungeon = [
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
      ["WALL", "SPACE", "PLAYER", "SPACE", "SPACE", "WALL"],
      ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
      ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"]
    ];
    const newState = { ...state, dungeon: initDungeon };
    const expected = {
      ...newState,
      dungeon: dungeon,
      player: { ...state.player, position: position }
    };
    expect(
      reducer(newState, {
        type: types.PUT_PLAYER,
        position: position
      })
    ).toEqual(expected);
  });

  it("should handle PUT_BOSS", () => {
    const id = 3;
    const staff = [
      { id: 1, kind: "medicine", position: { x: 3, y: 4 } },
      {
        id: 2,
        boss: false,
        kind: "enemy",
        health: 60,
        attack: 5,
        position: { x: 3, y: 4 }
      },
      { id: 3, kind: "medicine", position: { x: 3, y: 4 } },
      {
        id: 4,
        boss: false,
        kind: "enemy",
        health: 60,
        attack: 5,
        position: { x: 3, y: 4 }
      },
      { id: 5, kind: "medicine", position: { x: 3, y: 4 } }
    ];
    const newState = { ...state, staff: staff };
    const expectedStaff = [
      { id: 1, kind: "medicine", position: { x: 3, y: 4 } },
      {
        id: 2,
        boss: false,
        kind: "enemy",
        health: 60,
        attack: 5,
        position: { x: 3, y: 4 }
      },
      {
        id: 3,
        boss: true,
        kind: "enemy",
        health: 400,
        attack: 30,
        position: { x: 3, y: 4 }
      },
      {
        id: 4,
        boss: false,
        kind: "enemy",
        health: 60,
        attack: 5,
        position: { x: 3, y: 4 }
      },
      { id: 5, kind: "medicine", position: { x: 3, y: 4 } }
    ];
    const expected = { ...newState, staff: expectedStaff };
    expect(
      reducer(newState, {
        type: types.PUT_BOSS,
        id: id
      })
    ).toEqual(expected);
  });

  it("should handle PUT_STAFF", () => {
    const staff = { id: 0, kind: "medicine", position: { x: 3, y: 2 } };
    const initDungeon = [
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
      ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
      ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
      ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"]
    ];
    const initStaff = [
      { id: 1, kind: "medicine", position: { x: 3, y: 4 } },
      {
        id: 2,
        boss: false,
        kind: "enemy",
        health: 60,
        attack: 5,
        position: { x: 3, y: 4 }
      },
      { id: 3, kind: "medicine", position: { x: 3, y: 4 } },
      {
        id: 4,
        boss: false,
        kind: "enemy",
        health: 60,
        attack: 5,
        position: { x: 3, y: 4 }
      },
      { id: 5, kind: "medicine", position: { x: 3, y: 4 } }
    ];
    const dungeon = [
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
      ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
      ["WALL", "SPACE", 6, "SPACE", "SPACE", "WALL"],
      ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
      ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"]
    ];
    const expectedStaff = [
      { id: 1, kind: "medicine", position: { x: 3, y: 4 } },
      {
        id: 2,
        boss: false,
        kind: "enemy",
        health: 60,
        attack: 5,
        position: { x: 3, y: 4 }
      },
      { id: 3, kind: "medicine", position: { x: 3, y: 4 } },
      {
        id: 4,
        boss: false,
        kind: "enemy",
        health: 60,
        attack: 5,
        position: { x: 3, y: 4 }
      },
      { id: 5, kind: "medicine", position: { x: 3, y: 4 } },
      { id: 6, kind: "medicine", position: { x: 3, y: 2 } }
    ];
    const newState = { ...state, staff: initStaff, dungeon: initDungeon };
    const expected = { ...newState, staff: expectedStaff, dungeon: dungeon };
    expect(
      reducer(newState, {
        type: types.PUT_STAFF,
        staff: staff
      })
    ).toEqual(expected);
  });

  it("should handle ATTACK_ENEMY", () => {
    const id = 3;
    const bonus = 40;
    const enemyAttack = 20;
    const staff = [
      { id: 1, kind: "medicine", position: { x: 3, y: 4 } },
      {
        id: 2,
        boss: false,
        kind: "enemy",
        health: 60,
        attack: 5,
        position: { x: 3, y: 4 }
      },
      {
        id: 3,
        boss: true,
        kind: "enemy",
        health: 300,
        attack: 20,
        position: { x: 3, y: 4 }
      },
      {
        id: 4,
        boss: false,
        kind: "enemy",
        health: 60,
        attack: 5,
        position: { x: 3, y: 4 }
      },
      { id: 5, kind: "medicine", position: { x: 3, y: 4 } }
    ];
    const player = { ...state.player, attack: 10, health: 100, xp: 2 };
    const newState = { ...state, staff: staff, player: player };
    const expectedStaff = [
      { id: 1, kind: "medicine", position: { x: 3, y: 4 } },
      {
        id: 2,
        boss: false,
        kind: "enemy",
        health: 60,
        attack: 5,
        position: { x: 3, y: 4 }
      },
      {
        id: 3,
        boss: true,
        kind: "enemy",
        health: 250,
        attack: 20,
        position: { x: 3, y: 4 }
      },
      {
        id: 4,
        boss: false,
        kind: "enemy",
        health: 60,
        attack: 5,
        position: { x: 3, y: 4 }
      },
      { id: 5, kind: "medicine", position: { x: 3, y: 4 } }
    ];
    const expectedPlayer = { ...state.player, health: 80, xp: 22 };
    const expected = { ...state, staff: expectedStaff, player: expectedPlayer };
    expect(
      reducer(newState, {
        type: types.ATTACK_ENEMY,
        id: id,
        bonus: bonus,
        enemyAttack: enemyAttack
      })
    ).toEqual(expected);
  });

  it("should handle CHANGE_HEALTH", () => {
    const position = { x: 12, y: 10 };
    const staff = [{ id: 1, kind: "medicine", position: position }];
    const player = { ...state.player, health: 100 };
    const newState = { ...state, staff: staff, player: player };
    const expected = {
      ...state,
      staff: [],
      player: { ...state.player, health: 160 }
    };
    expect(
      reducer(newState, {
        type: types.CHANGE_HEALTH,
        position: position
      })
    ).toEqual(expected);
  });

  it("should handle CHANGE_WEAPON", () => {
    const position = { x: 12, y: 10 };
    const kind = "something";
    const staff = [{ id: 1, kind: "weapon", position: position }];
    const newState = {
      ...state,
      staff: staff,
      player: { ...state.player, weapon: "stick" }
    };
    const expected = {
      ...state,
      staff: [],
      player: { ...state.player, weapon: kind }
    };
    expect(
      reducer(newState, {
        type: types.CHANGE_WEAPON,
        position: position,
        kind: kind
      })
    ).toEqual(expected);
  });

  it("should handle ADD_LEVEL", () => {
    const player = {
      ...state.player,
      health: 100,
      attack: 12,
      level: 3,
      nextlevel: 9,
      xp: 12
    };
    const newState = { ...state, player: player };
    const expectedPlayer = {
      ...state.player,
      health: 200,
      attack: 12,
      level: 4,
      nextlevel: 18,
      xp: 3
    };
    const expected = { ...state, player: expectedPlayer };
    expect(
      reducer(newState, {
        type: types.ADD_LEVEL
      })
    ).toEqual(expected);
  });

  it("should handle REMOVE_ENEMY", () => {
    const position = { x: 3, y: 2 };
    const staff = [
      {
        id: 2,
        boss: false,
        kind: "enemy",
        health: 60,
        attack: 5,
        position: position
      },
      {
        id: 5,
        boss: false,
        kind: "enemy",
        health: 60,
        attack: 5,
        position: { x: 3, y: 4 }
      }
    ];
    const newState = { ...state, staff: staff };
    const expectedStaff = [
      {
        id: 5,
        boss: false,
        kind: "enemy",
        health: 60,
        attack: 5,
        position: { x: 3, y: 4 }
      }
    ];
    const expected = { ...state, staff: expectedStaff };
    expect(
      reducer(newState, {
        type: types.REMOVE_ENEMY,
        position: position
      })
    ).toEqual(expected);
  });
});

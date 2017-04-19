import {
    ADD_DUNGEON,
    ADD_ROOM_TO_DUNGEON,
    ADD_CORRIDORS_TO_DUNGEON,
    PUT_PLAYER,
    PUT_BOSS,
    ATTACK_BOSS,
    ATTACK_ENEMY,
    PUT_STAFF,
    CHANGE_HEALTH,
    CHANGE_ATTACK,
    CHANGE_WEAPON,
    CHANGE_XP,
    ADD_LEVEL,
    REMOVE_ENEMY
} from "./actionTypes";
import { initState } from "./store.js";

export default function reducer(state = initState(), action) {
    switch (action.type) {
        case ADD_DUNGEON:
            return {
                ...state,
                dungeon: action.dungeon
            }

        case ADD_ROOM_TO_DUNGEON:
            return {
                ...state,
                dungeon: state.dungeon.map((element, i) => {
                    let newRoom = action.position;
                    if (i > newRoom.x - action.length && i <= newRoom.x + action.length) {
                        return element.map((el, j) => {
                            if (j > newRoom.y - action.length && j <= newRoom.y + action.length) {
                                return "SPACE";
                            }
                            return el;
                        });
                    }
                    return element;
                }),
                rooms: [...state.rooms, { x: action.position.x, y: action.position.y }]
            }

        case ADD_CORRIDORS_TO_DUNGEON:
            let minX = Math.min(action.way.room1.x, action.way.room2.x);
            let maxX = Math.max(action.way.room1.x, action.way.room2.x);
            let minY = Math.min(action.way.room1.y, action.way.room2.y);
            let maxY = Math.max(action.way.room1.y, action.way.room2.y);
            return {
                ...state,
                dungeon: state.dungeon.map((element, i) => {
                    if (i >= minX && i <= maxX) {
                        return element.map((el, j) => {
                            if (j === action.way.room1.y && i !== action.way.room1.x) {
                                return "SPACE";
                            }
                            if (i === action.way.room2.x && j > minY && j <= maxY) {
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
                    position: { x: action.position.x, y: action.position.y }
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
                staff: state.staff.map((element) => {
                    if (element.id === action.id) {
                        return {...element, kind: "enemy", boss: true, health: 300, attack: 20};
                    }
                    return element;
                }),
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

        case ATTACK_BOSS:
            return {
                ...state,
                boss: {
                    ...state.boss,
                    health: state.boss.health - state.player.attack - action.bonus
                },
                player: {
                    ...state.player,
                    health: state.player.health - state.boss.attack,
                    xp: state.player.xp + state.boss.attack
                }
            }

        case ATTACK_ENEMY:
            return {
                 ...state,
                staff: state.staff.map(element => {
                    if (element.id === action.id) {
                        return {...element, 
                                health: element.health - state.player.attack - action.bonus};
                    }
                    return element;
                }),
                player: {
                    ...state.player,
                    health: state.player.health - action.enemyAttack,
                    xp: state.player.xp + action.enemyAttack
                }
            }


        case PUT_STAFF:
            let id = state.staff.length+1;
            return {
                ...state,
                staff: [...state.staff, {...action.staff, id: id}],
                dungeon: state.dungeon.map((element, i) => {
                    if (i === action.staff.position.x) {
                        return element.map((el, j) => {
                            if (j === action.staff.position.y) {
                                return id;
                            }
                            return el;
                        });
                    }
                    return element;
                })
            }

        case CHANGE_HEALTH:
            return {
                ...state,
                staff: state.staff.filter(element => !(element.position.x === action.position.x && element.position.y === action.position.y)),
                player: {
                    ...state.player,
                    health: state.player.health + 60
                }
            }

        case CHANGE_ATTACK:
            return {
                ...state,
                staff: state.staff.filter(element => !(element.position.x === action.position.x && element.position.y === action.position.y)),
                player: {
                    ...state.player,
                    attack: state.player.attack + 10
                }
            }

        case CHANGE_WEAPON:
            return {
                ...state,
                staff: state.staff.filter(element => !(element.position.x === action.position.x && element.position.y === action.position.y)),
                player: {
                    ...state.player,
                    weapon: action.kind
                }
            }


        case ADD_LEVEL:
            return {
                ...state,
                player: {
                    ...state.player,
                    attack: state.player.attack * 2,
                    level: state.player.level + 1,
                    xp: state.player.xp - state.player.nextlevel,
                    nextlevel: state.player.nextlevel * 2
                }
            }

        case REMOVE_ENEMY: 
            return {
                ...state,
                staff: state.staff.filter(element => !(element.position.x === action.position.x && element.position.y === action.position.y)),
            }

        default:
            return state;
    }
}
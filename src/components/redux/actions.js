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
    RESTORE_CURRENT_ENEMY
} from "./actionTypes";


export function addDungeon(dungeon) {
    return {
        type: ADD_DUNGEON,
        dungeon
    }
}

export function addRoomToDungeon(position, length) {
    return {
        type: ADD_ROOM_TO_DUNGEON,
        position,
        length
    }
}

export function addCorridorsToDungeon(way) {
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

export function attackBoss(bonus) {
    return {
        type: ATTACK_BOSS,
        bonus
    }
}

export function attackEnemy(position) {
    return {
        type: ATTACK_ENEMY,
        position
    }
}

export function putStaff(kind, position) {
    return {
        type: PUT_STAFF,
        kind,
        position
    }
}

export function changeHealth(position) {
    return {
        type: CHANGE_HEALTH,
        position
    }
}
export function changeAttack(position) {
    return {
        type: CHANGE_ATTACK,
        position
    }
}
export function changeWeapon(position, kind) {
    return {
        type: CHANGE_WEAPON,
        position,
        kind
    }
}
export function changeXp() {
    return {
        type: CHANGE_XP
    }
}

export function addLevel() {
    return {
        type: ADD_LEVEL
    }
}

export function restoreCurrentEnemy(position) {
    return {
        type: RESTORE_CURRENT_ENEMY,
        position
    }
}
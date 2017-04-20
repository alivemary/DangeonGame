import {
    ADD_DUNGEON,
    ADD_ROOM_TO_DUNGEON,
    ADD_CORRIDORS_TO_DUNGEON,
    PUT_PLAYER,
    PUT_BOSS,
    ATTACK_ENEMY,
    PUT_STAFF,
    CHANGE_HEALTH,
    CHANGE_WEAPON,
    CHANGE_XP,
    ADD_LEVEL,
    REMOVE_ENEMY
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

export function putBoss(id, position) {
    return {
        type: PUT_BOSS,
        id,
        position
    }
}

export function attackEnemy(id, bonus, enemyAttack) {
    return {
        type: ATTACK_ENEMY,
        id, 
        bonus,
        enemyAttack
    }
}

export function putStaff(staff) {
    return {
        type: PUT_STAFF,
        staff
    }
}

export function changeHealth(position) {
    return {
        type: CHANGE_HEALTH,
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

export function removeEnemy(position) {
    return {
        type: REMOVE_ENEMY,
        position
    }
}
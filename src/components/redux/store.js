import { createStore } from "redux";
import reducer from "./reducer.js";

export function initState() {

    return {
        dungeon: [],
        rooms: [],
        player: {
            position: { x: 0, y: 0 },
            health: 100,
            attack: 17,
            level: 0,
            xp: 0,
            nextlevel: 60
        },
        boss: {
            position: { x: 0, y: 0 },
            health: 500,
            attack: 20
        },
        staff: []
    }
}

export default function configureStore(
    initialState = initState()
) {
    return createStore(reducer, initialState);
}
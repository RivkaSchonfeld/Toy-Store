
export const loadGame = (list) => {
    return { type: "SET-GAME-LIST", payload: list }
}

export const removeGameFromReducer = (id) => {
    return { type: "REMOVE-GAME", payload: id }
}

export const addGameToReducer = (obj) => {
    return { type: "ADD-GAME", payload: obj }
}

export const editGameInReducer = (id, obj) => {
    return { type: "EDIT-GAME", payload: { id: id, obj: obj } }
}

export const removeItemFromCart = (id) => {
    return { type: "REMOVE-ITEM", payload: id }
}

export const clearAllItemsFromCart=()=>{
    return { type: "REMOVE-All-ITEMS" }
}
export const addNicely = (obj) => {
    return { type: "ADD-TO-CART", payload: obj }
}

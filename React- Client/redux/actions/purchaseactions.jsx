

export const loadPurchase = (list) => {
    return { type: "SET-PURCHASE-LIST", payload: list }
}

export const addPurchaseToRedux = (purchase) => {
    return { type: "ADD-PURCHASE", payload: purchase }
}


export const loadCategory = (list) => {
   return { type: "SET-CATEGORY-LIST", payload: list }
}
export const addCategoryToReducer = (obj) => {
   return { type: "ADD-CATEGORY", payload: obj }
}
export const changeCategoryName = (index, name) => {
   return { type: "CHANGE-CATEGORY-NAME", payload: { index: index, name: name } }
}
export const removeCategoryFromReducer = (id) => {
   return { type: "REMOVE-CATEGORY", payload: id }
}

import { produce } from 'immer'

export const InitialState = {//here is the content
   categorylist: []
}

export const catred = produce((state, action) => {
   switch (action.type) {
      case "SET-CATEGORY-LIST": {
         state.categorylist = action.payload
         break;
      }
      case "ADD-CATEGORY": {
         state.categorylist.push({...action.payload})
         break;
      }
      case "CHANGE-CATEGORY-NAME": {
         state.categorylist[action.payload.index].name = action.payload.name
         break;
      }
      case "REMOVE-CATEGORY": { 
         state.categorylist = state.categorylist.filter(r => r._id != action.payload) }
   }
}, InitialState) 
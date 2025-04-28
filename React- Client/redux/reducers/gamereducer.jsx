
import { produce } from 'immer'

export const InitialState = {//here is the content
   gamelist: []
}

export const gamered = produce((state, action) => {
   switch (action.type) {
      case "SET-GAME-LIST": {
         state.gamelist = action.payload
         break;
      }//this is to change the game list
      case "ADD-GAME": {
         state.gamelist.push(action.payload)
         break;
      }
      case "REMOVE-GAME": {//over here send in the payload an id of the one that should be removed
         state.gamelist = state.gamelist.filter(p => p._id != action.payload)
         break;
      }
      case "EDIT-GAME": {
         state.gamelist = state.gamelist.filter(p => p._id != action.payload.id)
         state.gamelist.push(action.payload.obj)
      }
   }
}, InitialState)
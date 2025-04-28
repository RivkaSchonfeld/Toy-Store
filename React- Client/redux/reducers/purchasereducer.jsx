
import { produce } from 'immer'

export const InitialState = {//here is the content
   purchaselist: []
}

export const purred = produce((state, action) => {
   switch (action.type) {

      case "SET-PURCHASE-LIST": {
         state.purchaselist = action.payload//this is to change the purchase list
         break;
      }
      case "ADD-PURCHASE": {
         state.purchaselist.push(action.payload)
         break;
      }
   }
}, InitialState)
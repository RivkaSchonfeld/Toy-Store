
import { produce } from 'immer'

export const InitialState = {//here is the content
   currentCustomer: {name:"unknown"}//this is only an example
}// name: "Rivka",_id:"676d4cd8d34e255f0e7231c6"

export const custred = produce((state, action) => {
   switch (action.type) {
      case "SET-CURRENT-CUSTOMER": {
         state.currentCustomer = action.payload
         break;
      }
   }
}, InitialState)
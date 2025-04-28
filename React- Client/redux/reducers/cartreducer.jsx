
import { wait } from '@testing-library/user-event/dist/utils'
import { produce } from 'immer'

export const InitialState = {
   cartlist: [
      // { _id: "5454", name: "toys", amount: 3, price: 12 },
      // { _id: "4444", name: "cars", amount: 2, price: 20 }
   ],
   totalPrice: 0
}

export const cartred = produce((state, action) => {
   switch (action.type) {

      case "ADD-TO-CART": {
         const i = state.cartlist.findIndex(n => n._id == action.payload._id)
         if (i != -1) {//this is when it is in the cart already
            const priceToAdd = state.cartlist[i].price / state.cartlist[i].amount
            state.cartlist[i].amount++
            state.cartlist[i].price += priceToAdd
            state.totalPrice += priceToAdd
         }
         else {
            const obj = { ...action.payload, amount: 1 }
            state.cartlist.push(obj)
            state.totalPrice += action.payload.price} 
            break;}
            
      case "REMOVE-ITEM": {
         const index = state.cartlist.findIndex(m => m._id == action.payload)
         const pricetosubtract = (state.cartlist[index].price / state.cartlist[index].amount)
         if (state.cartlist[index].amount == 1) {
            state.totalPrice -= state.cartlist[index].price
            state.cartlist = state.cartlist.filter(v => v._id != state.cartlist[index]._id)
         }
         else {
            state.totalPrice -= pricetosubtract//the price for one
            state.cartlist[index].amount--
            state.cartlist[index].price -= pricetosubtract
         }
         break;
      }

      case "REMOVE-All-ITEMS": {
         state.cartlist = []
         state.totalPrice = 0
         break;
      }
   }
}, InitialState)
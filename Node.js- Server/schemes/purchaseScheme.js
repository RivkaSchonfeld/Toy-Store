import mongoose, { model, Schema } from "mongoose";

const purchases=Schema({
    customer_code:{
        type:mongoose.Types.ObjectId,
        ref:"customers"
    },
    date:{type:Date,default:new Date()},
    list_purchase:[],//codegame,name,amount,price
    total_price:Number
     
})
export default model("purchases",purchases)
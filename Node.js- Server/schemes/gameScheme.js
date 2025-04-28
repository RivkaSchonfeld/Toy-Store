import mongoose, {model, Schema } from "mongoose";


const games=Schema({
    name:String,
    code_category:{
       type:mongoose.Types.ObjectId,
       ref:"categories"
    },
    price:Number,
    img:String,
    quantity:Number
})
export default model("games",games)
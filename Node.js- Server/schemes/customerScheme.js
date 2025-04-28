import { model, Schema } from "mongoose";

const customers=Schema({
    name:String,
    password:String,
    card_number:String,
    cvv:String,
    exp_date:String
})
export default model("customers",customers)
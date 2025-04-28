import { model, Schema } from "mongoose"
const category=Schema({
    name:String
})

//creating the schema in mongo
export default model('categories',category)
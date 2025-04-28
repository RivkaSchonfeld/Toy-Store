import express from "express";
import mongoose from "mongoose";
import cr from "./routers/categoryroute.js";
import gr from "./routers/gameRouter.js";
import customerC from "./routers/customerrouter.js"
import pr from "./routers/purchaserouter.js"
import cors from "cors"
const app = express()
//cors
app.use(cors())

//choosing a file for the project

app.listen("8084", () => {
    console.log("its running");

})

app.use("/category", cr)
app.use("/game", gr)
app.use("/customer",customerC)
app.use("/purchase",pr)

app.use(express.static('pic'))


//go to the mongo
mongoose.connect("mongodb://0.0.0.0:27017/game_store")
    .then(() => {
        console.log("managed to connect to mongo")
    })
    .catch((err) => {
        console.log((err.message));

    })



// import cors from 'cors'
// const app = express()
// //חיבור בין שרת ללקוח יש בעית
// //cors
// app.use(cors())


// //הגדרה שהתיקיה של התמונות היא ציבורית
// app.use(express.static('pic'))


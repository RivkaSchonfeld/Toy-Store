import { Router } from "express";
import cc from "../controllers/customerController.js"
import bodyParser from "body-parser";
const cr=Router()
cr.use(bodyParser.json())

cr.post("/add",cc.add)
cr.get("/isValid/:name/:password",cc.isValid)
cr.get("/getAll",cc.getAll)
cr.put("/changeCardDetails/:id",cc.changeCardDetails)
export default cr

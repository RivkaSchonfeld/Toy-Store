import { Router } from "express";
import cc from "../controllers/categoryController.js";
import bodyParser from "body-parser"
const cr=Router()
cr.use(bodyParser.json())

cr.get("/getAll",cc.getAll)
cr.post("/add",cc.add)
cr.put("/update/:id",cc.update)
cr.delete("/remove/:id",cc.remove)

export default cr

//put is for editing
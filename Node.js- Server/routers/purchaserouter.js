import { Router } from "express"
import pc from "../controllers/purchaseController.js"

import bodyParser from "body-parser"

const pr = Router()

pr.use(bodyParser.json())

pr.post("/add",pc.add)
pr.get("/getAll",pc.getAll)
pr.get("/getCustomersPurchasesByHisId/:id",pc.getCustomersPurchaseByCustomerId)
//here put all the functions
export default pr
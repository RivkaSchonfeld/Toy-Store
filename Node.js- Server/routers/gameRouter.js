import { Router } from "express";
import gc from "../controllers/gameController.js"
import bodyParser from "body-parser";
const gr=Router();
gr.use(bodyParser.json())

gr.get("/getAll",gc.getAll)
gr.get("/getById/:id",gc.getById)
gr.get("/getByCategoryId/:cid",gc.getByCategoryId)
gr.post("/addGame",gc.add)
gr.put("/update/:id",gc.update)
gr.delete("/remove/:id",gc.remove)


export default gr
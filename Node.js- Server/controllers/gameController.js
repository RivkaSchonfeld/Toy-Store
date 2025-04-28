
import gameScheme from "../schemes/gameScheme.js";
export default {
    getAll: (req, res) => {
        gameScheme.find()
            .then((d) => {
                res.status(200).send(d)
            })
            .catch(() => {
                res.status(404).send("failed")
            })
    },
    getById: (req, res) => {
        gameScheme.findById(req.params.id).populate("code_category")//the whole obj that mathches the id  //makes the objects property that is an object to return as a whole// rak sheyesh kishrey gomlin
            .then((d) => {
                res.status(200).send(d)
            })
            .catch(() => {
                res.status(404).send("failed")
            })
    },
    getByCategoryId: (req, res) => {
        gameScheme.find({ code_category: req.params.cid })//add afield to mongo db
            .then((d) => res.status(200).send(d))
            .catch(() => res.status(404).send("failed"))

    },

    add: (req, res) => {        
        const f = new gameScheme(req.body)        
        f.save()
            .then((d) => {
                res.status(200).send(d)
            })
            .catch((err) => res.status(404).send("we are working on it sorry for waiting!! " + err.message))
    },
    update: (req, res) => {
        gameScheme.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((k) => res.status(200).send(k))
            .catch((err) => res.status(404).send(err.message))
    },//this works
    remove: (req, res) => {
        gameScheme.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).send(true))
            .catch(() => res.status(404).send(false))

    }//this works
}




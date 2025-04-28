
//get add update delete
//import the scheme of categories
import categoryScheme from "../schemes/categoryScheme.js"
export default {
    getAll: (req, res) => {
        categoryScheme.find()//can put{name:"kiki"} or age:{$gte:5}
            //.then catches the list that returns
            .then((list) => {
                res.status(200).send(list)

            })
            .catch((err) => {
                res.status(404).send(err.message)
            })


    },

    add: (req, res) => {
        const cat = new categoryScheme(req.body)//copies all data from the body to cat i made a new obj type categoryscheme
        cat.save()//adds a field in the table in mongo db
            .then((cat) => {
                res.status(200).send(cat)
            })
            .catch((err) => {
                res.status(404).send(err.message)
            })
    },
    update: (req, res) => {

        categoryScheme.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((k) =>
                res.status(200).send(k)
            )
            .catch((err) =>
                res.status(404).send("failed " + err.message)
            )
    },
    remove: (req, res) => {
        categoryScheme.findByIdAndDelete(req.params.id)
            .then(() =>
                res.status(200).send(true))
            .catch(() =>
                res.status(404).send("failed"))
    }
}
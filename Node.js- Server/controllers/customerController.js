
//add ,isacustomeraccording name and password
import customerScheme from "../schemes/customerScheme.js"
export default {
    getAll: (req, res) => {
        customerScheme.find()
            .then((t) => res.status(200).send(t))
            .catch((err) => res.status(404).send(err.message))
    },
    add: (req, res) => {
        const c = new customerScheme(req.body)

        c.save()
            .then((t) => {
                res.status(200).send(t)

            })
            .catch((err) => {
                res.status(404).send(err.message);
                console.log(err.message);

            })
    },
    isValid: (req, res) => {
        customerScheme.findOne({ name: req.params.name, password: req.params.password })
            .then((w) => {
                if (w != null)
                    res.status(200).send(w)
                else
                    res.status(200).send(false)

            })
            .catch((err) => res.status(404).send(err.message))
    },
    changeCardDetails: (req, res) => {//this works bh
        customerScheme.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((g) => {
                res.status(200).send(g)
            })
            .catch((err) => { console.log(err.message); res.status(404).send(err.message) })
    }

}
{/** 
    update: (req, res) => {
        gameScheme.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((k) => res.status(200).send(k))
            .catch((err) => res.status(404).send(err.message))
    },//this works */}

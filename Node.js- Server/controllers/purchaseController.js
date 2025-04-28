
import purchaseScheme from"../schemes/purchaseScheme.js"

export default{
    add:(req,res)=>{
        const p =new purchaseScheme(req.body)
        p.save()
        .then((t)=>res.status(200).send(t))
        .catch((err)=>res.status(404).send(err.message))
    },
    getCustomersPurchaseByCustomerId:(req,res)=>{        
        purchaseScheme.find({customer_code:req.params.id})//returns a list of all the purchases
        .then((t)=>{res.status(200).send(t)})
        .catch((err)=>res.status(404).send(err.message))
    },
    getAll:(req,res)=>{
        purchaseScheme.find()
        .then((t)=>res.status(200).send(t))
        .catch((err)=>res.status(404).send(err.message))
    }

}
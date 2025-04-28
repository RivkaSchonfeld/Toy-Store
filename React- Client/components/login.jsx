import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { isValidCustomer } from "../redux/axios/customeraxios"
import { changeCurrentCustomer } from "../redux/actions/customeractions"
import { useNavigate } from "react-router-dom"
import { clearAllItemsFromCart } from "../redux/actions/cartaction"
import { getCustomersPurchasesByHisId } from "../redux/axios/purchaseaxios"
import { loadPurchase } from "../redux/actions/purchaseactions"



export const Login = () => {
    const [user, setuser] = useState({})
    const [exc, setexc] = useState(false)
    const d = useDispatch()
    const nav = useNavigate()
    const oldCust=useSelector(p=>p.custred.currentCustomer.name)


    // const plist = useSelector(p => p.purred.purchaselist)
    // const customer = useSelector(i => i.custred.currentCustomer)
    // useEffect(() => {
    //     if (plist != null && plist.length == 0 || plist == undefined) {
    //         if (customer.name != "unknown")
    //             getCustomersPurchasesByHisId(customer._id)
    //                 .then(x => {
    //                     d(loadPurchase(x.data))

    //                 })
    //                 .catch((err) => console.log(err.message))
    //     }
    // }, [])



    const login = () => {
        isValidCustomer(user.name, user.password)
            .then((customer) => {
                if (customer.data != false) {
                    if(oldCust!="unknown")
                        d(clearAllItemsFromCart())
                    d(changeCurrentCustomer(customer.data))//here take the user to a different page
                    nav("/gameList")
                    alert(`Hello ${user.name}, welcome back!!`)
                }
                else
                    setexc(true)
            })
            .catch((err) => console.log(err.message))
    }

    return <div id="loginDiv">
        <div id="form2">
            <label>Name</label>
            <input onChange={(e) => setuser({ ...user, name: e.target.value })} />
            <label>Password</label>
            <input onChange={(e) => setuser({ ...user, password: e.target.value })} />
            {exc && <p style={{ color: "red" }}>--This user or password is invalid--</p>}
            <button onClick={() => login()}>Login</button>
        </div>
    </div>
}
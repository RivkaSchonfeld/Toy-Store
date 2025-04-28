import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCustomersPurchasesByHisId } from "../redux/axios/purchaseaxios"
import { loadPurchase } from "../redux/actions/purchaseactions"
import { useNavigate } from "react-router-dom"


export const Personelpage = () => {

    const plist = useSelector(p => p.purred.purchaselist)
    const customer = useSelector(i => i.custred.currentCustomer)
    const myd = useDispatch()
    const nav = useNavigate()
    useEffect(() => {
        if (plist != null && plist.length == 0 || plist == undefined) {
            if (customer.name != "unknown")
                getCustomersPurchasesByHisId(customer._id)
                    .then(x => {
                        myd(loadPurchase(x.data))

                    })
                    .catch((err) => console.log(err.message))
        }
    }, [])

    const showPurchaseIttems = (pur) => {
        const state={date:pur.date,total:pur.total_price,list:pur.list_purchase}
        nav("/items", { state: state })

    }
    if(plist.length==0)
        return <h4>You have not purchased anything with us yet.</h4>

    return <div className="container">
        <table className="table">
            <thead>
                <tr><th>Date</th><th>Price</th><th></th></tr>
            </thead>
            <tbody>
                {plist.map((v, i) => <tr key={i}>
                    <td>{new Date(v.date).getDate()}/{new Date(v.date).getMonth()+1}/{new Date(v.date).getFullYear()}</td>
                    <td>{v.total_price}</td>
                    <td><button onClick={() => showPurchaseIttems(v)}>Items</button></td>
                </tr>)}
            </tbody>
        </table>
    </div>

}
import { useState } from "react"
import { addOrderToServer, getCustomersPurchasesByHisId } from "../redux/axios/purchaseaxios"
import { addPurchaseToRedux, loadPurchase } from "../redux/actions/purchaseactions"
import { useDispatch, useSelector } from "react-redux"
import { changeCardDetailsFromTheServer } from "../redux/axios/customeraxios"
import { changeCurrentCustomer } from "../redux/actions/customeractions"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { clearAllItemsFromCart } from "../redux/actions/cartaction"




export const Payment = () => {

    const d = useDispatch()
    const [valid, setvalid] = useState({ number: true, exp: true, cvv: true })
    const [details, setdetails] = useState({ number: "", cvv: "", exp: "" })
    const [exc, setexc] = useState({ number: "This field must contain 16 digits only", exp: "the date has expired", cvv: "three digits only" })
    const cart = useSelector(u => u.cartred.cartlist)
    const totalprice = useSelector(t => t.cartred.totalPrice)
    const custid = useSelector(y => y.custred.currentCustomer._id)
    const nav = useNavigate()
    const plist = useSelector(p => p.purred.purchaselist)
    const customer = useSelector(i => i.custred.currentCustomer)
    const myd = useDispatch()
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

    const containsOnlyDigits = (str) => {
        for (let i = 0; i < str.length; i++)
            if (str[i] < '0' || str[i] > '9')
                return false
        return true
    }


    const checkIfValidNumber = (str) => {

        if (str == "") {
            setexc({ ...exc, number: "*Required" })
            return false
        }
        if (!containsOnlyDigits(str)) {
            setexc({ ...exc, number: "*Must contain only digits" })
            return false
        }
        if (str.length != 16) {
            setexc({ ...exc, number: "*Must contain 16 digits" })
            return false
        }
        return true
    }


    const checkIfvalidDate = (str) => {
        if (str == "") {
            setexc({ ...exc, exp: "*Required" })
            return false
        }
        const today = new Date()
        const date = new Date(details.exp)

        const y = date.getFullYear() - today.getFullYear()
        const m = date.getMonth() - today.getMonth()
        const d = date.getDate() - today.getDate()

        if ((y > 0) || (y == 0 && m > 0) || (y == 0 && m == 0 && d > 0)) {
            return true
        }
        else {
            setexc({ ...exc, exp: "*The date has expired" })
            return false
        }

    }

    const checkCvv = (str) => {
        if (str == "") {
            setexc({ ...exc, cvv: "*Required" })
            return false
        }
        if (!containsOnlyDigits(str)) {
            setexc({ ...exc, cvv: "*Must contain only digits" })
            return false
        }

        if (str.length != 3) {
            setexc({ ...exc, cvv: "*Must contain 3 digits" })
            return false
        }
        return true
    }


    const placeOrder = () => {
        const obj = { customer_code: custid, date: new Date(), list_purchase: cart.map(p => p), total_price: totalprice }
        addOrderToServer(obj)
            .then((u) => {
                d(addPurchaseToRedux(u.data))
                changeCardDetailsFromTheServer(details, custid)
                    .then((p) => {
                        d(changeCurrentCustomer(p.data))
                        alert("Your purchase was saved, total price: " + totalprice + ". Thank you for shopping Smart!")
                        d(clearAllItemsFromCart())
                        nav("/personelpage")
                    })
                    .catch((err) => console.log(err.message))
            })
            .catch((err) => console.log(err.message))
    }




    return < div className="container">
        <div style={{ display: "flex", flexDirection: "column", width: "30vw" }}>
            <label>credit card number</label>
            <input value={details.number} onChange={(e) => setdetails({ ...details, number: e.target.value })} onBlur={() => { setvalid({ ...valid, number: checkIfValidNumber(details.number) }) }} />
            {!valid.number && <p style={{ color: "red" }}>{exc.number}</p>}
            <label>expiration date</label>
            <input type="date" value={details.exp} onChange={(e) => setdetails({ ...details, exp: e.target.value })} onBlur={() => { setvalid({ ...valid, exp: checkIfvalidDate(details.exp) }) }} />
            {!valid.exp && <p style={{ color: "red" }}>{exc.exp}</p>}
            <label>cvv</label>
            <input value={details.cvv} onChange={(e) => setdetails({ ...details, cvv: e.target.value })} onBlur={() => { setvalid({ ...valid, cvv: checkCvv(details.cvv) }) }} />
            {!valid.cvv && <p style={{ color: "red" }}>{exc.cvv}</p>}
            <button onClick={() => {
                if (valid.cvv && valid.exp && valid.number)
                    placeOrder()
                else
                    alert("The details are not valid")
            }}>Order</button>

        </div>

    </div>
}

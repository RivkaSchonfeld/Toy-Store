import { useState } from "react"
import { addCustomer, isValidCustomer } from "../redux/axios/customeraxios"
import { changeCurrentCustomer } from "../redux/actions/customeractions"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearAllItemsFromCart } from "../redux/actions/cartaction"
import { Payment } from "./payment"



export const Register = () => {
    const d = useDispatch()
    const nav = useNavigate()
    const oldCust = useSelector(p => p.custred.currentCustomer.name)
    const [user, setuser] = useState({ name: "", password: "", card_number: "", cvv: "", exp_date: "" })
    
    // const [details, setdetails] = useState({ number: "", cvv: "", exp: "" })
    // const [valid, setvalid] = useState({ number: true, exp: true, cvv: true })
    // const [exc, setexc] = useState({ number: "This field must contain 16 digits only", exp: "the date has expired", cvv: "three digits only" })



    const makeANewCustomer = () => {
        isValidCustomer(user.name, user.password)
            .then((obj) => {
                if (obj.data == false) {//now we can make a new one
                    addCustomer(user)
                        .then((newcust) => {
                            if (oldCust != "unknown")
                                d(clearAllItemsFromCart())
                            d(changeCurrentCustomer(newcust.data))
                            alert(`Thank you for joining us ${newcust.data.name}`)
                            nav("/gameList")
                        })
                        .catch((err) => console.log(err))
                }
                else
                    alert("The customer already exists please make a new one or login")
            })
            .catch((err) => console.log(err))
    }

    return <div id="registerDiv">
        <div id="form">
            <label>Name</label>
            <input value={user.name} onChange={(e) => setuser({ ...user, name: e.target.value })} />
            <label>Password</label>
            <input type="password" value={user.password} onChange={(e) => setuser({ ...user, password: e.target.value })} />
            {/* <div style={{ display: "flex", flexDirection: "column", width: "30vw" }}> */}
            <label>credit card number</label>
            <input value={user.number} onChange={(e) => setuser({ ...user, card_number: e.target.value })} 
            // onBlur={() => { setvalid({ ...valid, number: checkIfValidNumber(details.number) }) }} 
            />
            {/* {!valid.number && <p style={{ color: "red" }}>{exc.number}</p>} */}
            <label>expiration date</label>
            <input type="date" value={user.exp} onChange={(e) => setuser({ ...user, exp_date: e.target.value })} 
            // onBlur={() => { setvalid({ ...valid, exp: checkIfvalidDate(details.exp) }) }} 
            />
            {/* {!valid.exp && <p style={{ color: "red" }}>{exc.exp}</p>} */}
            <label>cvv</label>
            <input value={user.cvv} onChange={(e) => setuser({ ...user, cvv: e.target.value })} 
            // onBlur={() => { setvalid({ ...valid, cvv: checkCvv(details.cvv) }) }}
             />
            {/* {!valid.cvv && <p style={{ color: "red" }}>{exc.cvv}</p>} */}
            {/* <button onClick={() => {
                if (valid.cvv && valid.exp && valid.number)
                    placeOrder()
                else
                    alert("The details are not valid")
            }}>Order</button> */}
            <button onClick={() => { makeANewCustomer() }}>Join Us</button>
            {/* </div> */}
        </div >

    </div >
}

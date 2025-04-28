import { useDispatch, useSelector } from "react-redux"
import { removeItemFromCart, addNicely, clearAllItemsFromCart } from "../redux/actions/cartaction";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { addPurchaseToRedux, loadPurchase } from "../redux/actions/purchaseactions";
import { addOrderToServer, getCustomersPurchasesByHisId } from "../redux/axios/purchaseaxios";


export const Cart = () => {

    const cart = useSelector(u => u.cartred.cartlist)
    const d = useDispatch()
    const showPrice = useSelector(l => l.cartred.totalPrice)
    const currentuser = useSelector(b => b.custred.currentCustomer.name)
    const user = useSelector(b => b.custred.currentCustomer)
    const totalPrice = useSelector(b => b.cartred.totalPrice)
    const nav = useNavigate()

    const plist = useSelector(p => p.purred.purchaselist)
    const customer = useSelector(i => i.custred.currentCustomer)

    const addItem = (obj) => {
        d(addNicely(obj))
    }

    const removeItem = (id) => {
        d(removeItemFromCart(id))
    }

    const placeOrder = () => {

        if (currentuser == "unknown")
            nav("/register")

        else {
            const obj = { customer_code: user._id, date: new Date(), list_purchase: cart.map(p => p), total_price: totalPrice }
            if (plist == undefined || plist != null && plist.length == 0) {
                getCustomersPurchasesByHisId(customer._id)
                    .then(x => {
                        d(loadPurchase(x.data))
                        order(obj)
                        nav("/personelpage")
                        d(clearAllItemsFromCart())
                    })
                    .catch((err) => console.log(err.message))
            }
            else {
                order(obj)
                nav("/personelpage")
            }
        }
    }


    const order = (obj) => {
        addOrderToServer(obj)
            .then((u) => {
                d(addPurchaseToRedux(u.data))
                alert("Your purchase was saved, total price: " + totalPrice + ". Thank you for shopping Smart!")
            })
            .catch((err) => console.log(err.message))
    }

    if (cart.length == 0)
        return <h4>The cart is empty</h4>

    return <div className="container ">
        <table className="table">
            <thead>
                <tr><th>Name</th><th>Amount</th><th>price</th><th></th><th></th></tr>
            </thead>
            <tbody>
                {cart.map((r, i) =>
                    <tr key={i}>
                        <td>{r.name}</td>
                        <td>{r.amount}</td>
                        <td>{r.price}</td>
                        <td><button onClick={() => addItem(r)}>+</button></td>
                        <td><button onClick={() => removeItem(r._id)}>-</button></td>
                    </tr>
                )}
                <tr><td></td><td></td><td>{showPrice}</td><td></td><td></td></tr>
            </tbody>
        </table>
        <button onClick={() => placeOrder()}>Order</button>
    </div>
}
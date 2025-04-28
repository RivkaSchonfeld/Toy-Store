import { useLocation, useNavigate } from "react-router"
import { addNicely } from "../redux/actions/cartaction"
import { useDispatch} from "react-redux"


export const Singlegame = () => {
   const loc = useLocation()
   const state = loc.state
   const nav=useNavigate()
   const myd=useDispatch()

   const addItemToReduxCart = () => {
      myd(addNicely({_id:state._id,name:state.name,code_category:state.code_category,price:state.price,img:state.img,quantity:state.quantity}))
  }




   return <div>
      <div><img src={`http://localhost:8084/${state.img}`} alt="" style={{ width: "20vw", height: "20vw", borderRadius: "2px" }} /></div>
      <br />
      <p style={{ display: "flex", marginLeft: "40vw" }}><h6>Game:</h6> {state.name}</p>
      <p style={{ display: "flex", marginLeft: "40vw" }}><h6>Category:</h6> {state.category}</p>
      <p style={{ display: "flex", marginLeft: "40vw" }}><h6>Price:</h6> {state.price}</p>
      <button onClick={()=>addItemToReduxCart()}>Add to cart</button>
      <button onClick={()=>nav("/gameList")}>Back</button>
   </div>


}

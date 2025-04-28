
import { useLocation, useNavigate } from "react-router"


export const Items = () => {
    const loc = useLocation()
    const state = loc.state
    const list = state.list
    const date = new Date(state.date)
    const nav = useNavigate()
    return <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ boxShadow: " 3px 3px 0.5rem rgb(24, 22, 18)", width: "20%", MinHeight: "10%", borderColor: "black", padding: "3rem" }}>
            <h4 style={{color:"grey"}}>Toy Story <img src="http://localhost:8084/backgroundpuzzle2.jpg" style={{height:"13%",width:"13%"}}/></h4>
            <br/>
            {list.map((l, i) => <p key={i} style={{ fontWeight: "bold" }}>{l.name}    {l.amount} x {l.price / l.amount}     {l.price}</p>)}
            <br />
            <h6>Total price: {state.total}</h6>
            <h6>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</h6>
            <br />
            <button onClick={() => nav("/personelpage")}>Back</button>
        </div>
    </div>

}
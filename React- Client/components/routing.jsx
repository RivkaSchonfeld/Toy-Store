import { Route, Routes } from "react-router-dom"
import { Categorylist } from "./categorylist"
import { Gamelist } from "./gamelist"
import { Homepage } from "./homepage"
import { Cart } from "./cart"
import { Payment } from "./payment"
import { Login } from "./login"
import { Editgames } from "./editgames"
import { Editcategories } from "./editcategories"
import { Register } from "./register"
import { Personelpage } from "./personelpage"
import { Singlegame } from "./singlegame"
import { Items } from "./itemsfrompurchase"

export const Routing = () => {

    return <Routes>
        <Route path="/categoryList" element={<Categorylist></Categorylist>}></Route>
        <Route path="/gameList" element={<Gamelist></Gamelist>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/Homepage" element={<Homepage></Homepage>}></Route>
        <Route path="/payment" element={<Payment></Payment>}></Route>
        <Route path="/personelpage" element={<Personelpage></Personelpage>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/editgames" element={<Editgames></Editgames>}></Route>
        <Route path="/editcategories" element={<Editcategories></Editcategories>}></Route>
        <Route path="/singlegame" element={<Singlegame></Singlegame>}></Route>
        <Route path="/items" element={<Items></Items>}></Route>
        <Route path="/" element={<Homepage></Homepage>}></Route>
    </Routes>
}
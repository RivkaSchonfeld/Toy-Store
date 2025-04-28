
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllGame } from "../redux/axios/gameaxios";
import { getAllCategory } from "../redux/axios/categoryaxios";
import { loadCategory } from "../redux/actions/categoryactions";
import { loadGame } from "../redux/actions/gameactions";
import { addNicely } from "../redux/actions/cartaction";
import { useNavigate } from "react-router-dom"


export const Gamelist = () => {
    const gameList = useSelector(f => f.gamered.gamelist)
    const catList = useSelector(i => i.catred.categorylist)
    const [showlist, setshowlist] = useState(gameList)
    const [search, setsearch] = useState("")
    let myd = useDispatch()
    const nav = useNavigate()

    useEffect(() => {
        if (gameList != null && gameList.length == 0 || gameList == undefined) {
            getAllGame()
                .then(x => myd(loadGame(x.data)))
                .catch((err) => console.log(err.message))
        }
        if (catList != null && catList.length == 0 || catList == undefined) {
            getAllCategory()
                .then(x => myd(loadCategory(x.data)))
                .catch((err) => console.log(err.message))
        }

    }, [])


    const getCategory = (cid) => {
        let category
        category = catList.filter(p => p._id == cid)
        if (category.length > 0)
            return category[0].name
        return "none"

    }

    const addItemToReduxCart = (item) => {
        myd(addNicely(item))
    }

    const filterGames = (cid) => {
        if (cid == "all") {
            setshowlist(gameList)
        }
        else {
            setshowlist(gameList.filter(m => m.code_category == cid))
        }
    }
    const goToDetails = (item) => {
        const catName = getCategory(item.code_category)
        nav("/singlegame", { state: { ...item, category: catName } })

    }

    const searchAccordingToSearch = (str) => {
        if (search != "")
            setshowlist(gameList.filter(m => m.name.includes(str)))
        console.log(showlist)
    }

    return <div className="container">
        <div className="container" style={{ display: "flex", justifyContent: "center" }}>
            <select onChange={(e) => { filterGames(e.target.value) }} className="form-select" style={{ width: "20vw" }} >
                <option key="-1" value={"all"} style={{ color: "rgb(241, 186, 120)" }}>All</option>
                {catList.map((g, i) => <option key={i} value={g._id} style={{ color: "rgb(241, 186, 120)" }}>{g.name}</option>)}
            </select>
        </div>
        <br />
        <input placeholder="Search" value={search}
            onChange={(e) => {
                setsearch(e.target.value)
                searchAccordingToSearch(e.target.value)
            }} />

        <br />
        <table className="table">
            <thead>
                <tr><th></th><th>Name</th><th>Price</th><th>Category</th><th></th><th></th></tr>
            </thead>
            <tbody>
                {showlist.map((v, i) => <tr key={i}>
                    <td><img src={`http://localhost:8084/${v.img}`} alt="http://localhost:8084/boat.jpg" style={{ width: "10vw", height: "10vw", borderRadius: "2px" }} /></td>
                    <td>{v.name}</td>
                    <td>{v.price}</td>
                    <td>{getCategory(v.code_category)}</td>
                    <td><button onClick={() => { addItemToReduxCart(v) }}>Add To Cart</button></td>
                    <td><button onClick={() => { goToDetails(v) }}>More Details</button></td>

                </tr>)}
            </tbody>
        </table>
    </div>

}
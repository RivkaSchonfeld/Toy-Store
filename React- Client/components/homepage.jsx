import { Gamelist } from "./gamelist"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllGame } from "../redux/axios/gameaxios";
import { getAllCategory } from "../redux/axios/categoryaxios";
import { loadCategory } from "../redux/actions/categoryactions";
import { loadGame } from "../redux/actions/gameactions";

export const Homepage = () => {
    const gameList = useSelector(f => f.gamered.gamelist)
    const catList = useSelector(i => i.catred.categorylist)//why does this happen a few times?
    const myd = useDispatch()



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

    return <div className="container">
    <h1 style={{color:"grey"}}>Toy Story  <img  style={{width:"3rem",height:"3rem"}} src="http://localhost:8084/backgroundpuzzle2.jpg"/></h1>
    <br/>
        <Gamelist></Gamelist></div>
}

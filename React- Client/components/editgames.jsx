import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addGameToServer, getAllGame, removeGameFromServer, updateGame } from "../redux/axios/gameaxios";
import { getAllCategory } from "../redux/axios/categoryaxios";
import { loadCategory } from "../redux/actions/categoryactions";
import { addGameToReducer, editGameInReducer, loadGame, removeGameFromReducer } from "../redux/actions/gameactions";

export const Editgames = () => {
    const gameList = useSelector(f => f.gamered.gamelist)
    const catList = useSelector(i => i.catred.categorylist)//why does this happen a few times?
    let myd = useDispatch()

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


    const [addingnew, setaddingnew] = useState(true)
    const [inputs, setinputs] = useState({ name: "", price: "", quantity: "", img: "", code_category: "" })
    const [nameval, setnameval] = useState(false)
    const [priceval, setpriceval] = useState(false)
    const [word2, setword2] = useState("Add")
    const [idOfEdited, setIdOfEdited] = useState("")

    const getCategory = (cid) => {
        let category = catList.filter(p => p._id == cid)
        if (category.length > 0)
            return category[0].name
        return "none"

    }

    const functionEditGame = (obj) => {
        setword2("Set")
        setaddingnew(false)//now i am editing and not adding a new game
        setIdOfEdited(obj._id)
        setinputs({ name: obj.name, price: obj.price, quantity: obj.quantity, img: obj.img, code_category: obj.code_category })
    }

    const setEditedGame = () => {//here take the details from the inputs obj and send it to the redux and to the data base
        updateGame(inputs, idOfEdited)
            .then((obj) => {
                myd(editGameInReducer(idOfEdited, obj.data))
                setinputs({ name: "", price: "", quantity: "", img: "", code_category: "" })
                setIdOfEdited("")
                setaddingnew(true)
                setword2("Add")
            })
            .catch((err) => console.log(err.message));
    }

    const funcAddANewGame = () => {
        addGameToServer(inputs)
            .then((obj) => {
                myd(addGameToReducer(obj.data))
                setinputs({ name: "", price: "", quantity: "", img: "", code_category: "" })
                setIdOfEdited("")
            })
            .catch((err) => {
                console.log(err)
                alert("the code category is not synchronized with the categories")
            })

    }
    const containsOnlyDigits = (str) => {//this wasnt working
        debugger;
        if (str == "") {
            return false
        }
        for (let i = 0; i < str.length; i++)
            if (str[i] < '0' || str[i] > '9') {
                return false
            }
        return true
    }

    const removeGameFromList = (id) => {
        removeGameFromServer(id)
            .then(() => myd(removeGameFromReducer(id)))
            .catch((err) => console.log(err))

    }

    return <><div className="container" style={{ display: "flex", flexDirection: "column", width: "30vw" }}>
        <label>Name</label>
        <input onChange={(e) => setinputs({ ...inputs, name: e.target.value })}
            onBlur={() => { setnameval(inputs.name == "") }}
            value={inputs.name} />
        {nameval && <p style={{ color: "red" }}>*Required</p>}

        <label>Price</label>
        <input onChange={(e) => setinputs({ ...inputs, price: e.target.value })}
            onBlur={() => { setpriceval(!containsOnlyDigits(inputs.price)) }}
            value={inputs.price} />
        {priceval && <p style={{ color: "red" }}>*Required</p>}

        <label>Quantity</label>
        <input onChange={(e) => setinputs({ ...inputs, quantity: e.target.value })}
            value={inputs.quantity} />

        <label>Img Url</label>
        <input onChange={(e) => setinputs({ ...inputs, img: e.target.value })}
            value={inputs.img} />

        <label>Category</label>{/*how can i make the value be the game i am editing*/}
        <select onChange={(e) => setinputs({ ...inputs, code_category: e.target.value })}>
            {catList.map((h, i) => <option key={i} value={h._id} >{h.name}</option>)}
        </select>
        <br />
        <button onClick={() => {
            if (priceval || nameval)
                alert("Please fill in the form correctly")
            else {
                if (addingnew)
                    funcAddANewGame();
                else
                    setEditedGame()
            }
        }}
        >{word2} Game</button>
    </div>
        <div className="container">
            <table className="table">
                <thead>
                    <tr><th>Id</th><th>Name</th><th>Price</th><th>Category</th><th></th><th></th></tr>
                </thead>
                <tbody>
                    {gameList.map((v, i) => <tr key={i}>
                        <td>{v._id}</td>
                        <td>{v.name}</td>
                        <td>{v.price}</td>
                        <td>{getCategory(v.code_category)}</td>
                        <td><button onClick={() => { functionEditGame(v) }}>Edit</button></td>
                        <td><button onClick={() => { removeGameFromList(v._id) }}>Remove</button></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </>

}



// dont forget to do then and catch all times you access the server
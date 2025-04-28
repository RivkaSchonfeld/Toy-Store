import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addCategoryToServer, getAllCategory, removeCategoryFromServer, updateCategory } from "../redux/axios/categoryaxios";
import { addCategoryToReducer, changeCategoryName, loadCategory, removeCategoryFromReducer } from "../redux/actions/categoryactions";

export const Editcategories = () => {

    const catList = useSelector(f => f.catred.categorylist)
    let myd = useDispatch()

    useEffect(() => {
        if (catList != null && catList.length == 0 || catList == undefined) {
            getAllCategory()
                .then(x => myd(loadCategory(x.data)))
                .catch((err) => console.log(err.message))
        }
    }, [])

    const [ischanging, setischanging] = useState(false)
    const [idForchanging, setidForChanging] = useState("")
    const [input, setinput] = useState("")
    const [word, setword] = useState("Add")

    const editcategory = (name) => {
        setischanging(true)
        setinput(name)
        setword("Set")
    }

    const changeCategory = () => {
        updateCategory(idForchanging, input)
            .then(() => {
                const index = catList.findIndex(y => y._id == idForchanging)
                myd(changeCategoryName(index, input))
                setinput("")
                setischanging(false)
                setword("Add")
            })
            .catch((err) => console.log(err.message));
    }

    const addCategory = () => {
        addCategoryToServer({ name: input })
            .then((newobj) => {
                setinput("")
                myd(addCategoryToReducer(newobj.data))
            })
            .catch((err) => console.log(err.message));
    }

    const removeCategory = (id) => {
        removeCategoryFromServer(id)
            .then(() => {
                myd(removeCategoryFromReducer(id))
            })
            .catch((err) => console.log(err.message));
    }

    return <> <div className="container">
        <input value={input} placeholder="category name" id="catinput" onChange={(e) => setinput(e.target.value)} />
        <button onClick={() => { if (ischanging) changeCategory(); else addCategory() }}>{word} Category</button>
        <table className="table">
            <thead>
                <tr><th>Id</th><th>Name</th><th></th></tr>
            </thead>
            <tbody>
                {catList.map((v, i) => <tr key={i}>
                    <td>{v._id}</td>
                    <td>{v.name}</td>
                    <td><button onClick={() => { editcategory(v.name); setidForChanging(v._id) }}>Edit</button></td>
                    <td><button onClick={() => removeCategory(v._id)}>Remove</button></td>
                </tr>)}
            </tbody>
        </table>
    </div>
    </>

}
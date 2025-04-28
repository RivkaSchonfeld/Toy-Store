
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllCategory } from "../redux/axios/categoryaxios";
import { loadCategory } from "../redux/actions/categoryactions";

export const Categorylist = () => {

    const catList = useSelector(f => f.catred.categorylist)
    let myd = useDispatch()
    useEffect(() => {
        if (catList != null && catList.length == 0 || catList == undefined) {
            getAllCategory()
                .then(x => myd(loadCategory(x.data)))
                .catch((err) => console.log(err.message))
        }
    }, [])
    return <div className="container">
        <table className="table">
            <thead>
                <tr><th>Id</th><th>Name</th></tr>
            </thead>
            <tbody>
                {catList.map((v, i) => <tr key={i}><td>{v._id}</td><td>{v.name}</td></tr>)}

            </tbody>
        </table>
    </div>

}


import  axios  from 'axios'
const gameHttp = "http://localhost:8084/game/"//the local route of the controller



export const getAllGame = () => {
    return axios.get(`${gameHttp}getAll`)
}
export const getByIdGame = (id) => {
    return axios.get(`${gameHttp}getById/${id}`)
}
export const getByCategoryIdGame = (cid) => {
    return axios.get(`${gameHttp}getByCategoryId/${cid}`)
}
export const addGameToServer = (obj) => {
    return axios.post(`${gameHttp}addGame`,obj)
}
export const updateGame = (obj,id) => {
    return axios.put(`${gameHttp}update/${id}`,obj)
}
export const removeGameFromServer=(id)=>{
    return axios.delete(`${gameHttp}remove/${id}`)
}

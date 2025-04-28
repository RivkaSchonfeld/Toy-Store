//post add get isValid

import axios  from 'axios'
const customerHttp = "http://localhost:8084/customer/"//the local route of the controller

export const addCustomer = (obj) => {
    return axios.post(`${customerHttp}add`, obj)
}

export const isValidCustomer = ( name, password ) => {
    return axios.get(`${customerHttp}isValid/${name}/${password}`)
}

export const changeCardDetailsFromTheServer=(obj,id)=>{
    return axios.put(`${customerHttp}changeCardDetails/${id}`,obj)
}
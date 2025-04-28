
import  axios from 'axios'
const purchaseHttp = "http://localhost:8084/purchase/"//the local route of the controller

export const getCustomersPurchasesByHisId = (id) => {//this returns a list
    return axios.get(`${purchaseHttp}getCustomersPurchasesByHisId/${id}`)
}
export const addOrderToServer = (obj) => {
    return axios.post(`${purchaseHttp}add`,obj)
}

/*
 
pr.post("/add",pc.add)
pr.get("/getCustomersPurchasesByHisId/:id",pc.getCustomersPurchaseByCustomerId)
 */
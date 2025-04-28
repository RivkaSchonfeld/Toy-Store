import axios from 'axios'

const categoryHttp="http://localhost:8084/category/"//the local route of the controller

//parallel to each function in the controller we will config a function that will call it
export const getAllCategory=()=>{
    return axios.get(`${categoryHttp}getAll`)
}

export const addCategoryToServer=(obj)=>{
    return axios.post(`${categoryHttp}add`,obj)
}

export const updateCategory=(id,name)=>{
    return axios.put(`${categoryHttp}update/${id}`,{name:name})
}

export const removeCategoryFromServer=(id)=>{
    return axios.delete(`${categoryHttp}remove/${id}`)
}
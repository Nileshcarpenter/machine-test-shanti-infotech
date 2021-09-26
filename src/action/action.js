import {getRequest,postRequest,deleteRequest,putRequest} from "./helper"


 export const RegisterUser = (data) => {
     return postRequest('userregister',data).then(res=>{return res.data});
 }

export const deleteUser = (data) => {
    return postRequest('deleteUser',data).then(res=>{return res.data});
}
 
 export const UserLogin = (data) => {
    return postRequest('userlogin',data).then(res=>{return res.data});
}

 export const addTask = (data) => {
    return postRequest('addTask',data).then(res=>{return res.data});
}

export const getTaskList = (data) => {
    return getRequest('getTaskList',data).then(res=>{return res.data});
}

export const editTaskdata = (data) => {
    return postRequest('editTask',data).then(res=>{return res.data});
}

export const deleteTaskdata = (data) => {
    return postRequest('deleteTask',data).then(res=>{return res.data});
}

export const userList = (data) => {
    return getRequest('getUsersList',data).then(res=>{return res.data});
}

export const updateUserStatus = (data) => {
    return postRequest('updateUserStatus',data).then(res=>{return res.data});
}


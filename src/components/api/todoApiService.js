import axios from "axios";

export const axiosClient = axios.create(
    {
        baseURL: "http://localhost:8080"
    }
)

export const retreveAllUsersTodos = (user) => axiosClient.get(`/users/${user}/todos`)
export const deleteTodoId = (user,id) => axiosClient.delete(`/users/${user}/todos/${id}`)
export const retreveTodoId = (user,id) => axiosClient.get(`/users/${user}/todos/${id}`)
export const updateTodoId = (user,id, todo) => axiosClient.put(`/users/${user}/todos/${id}`,todo)
export const createTodoId = (user, todo) => axiosClient.post(`/users/${user}/todos`,todo)

export const checkAuthId = (token) => axiosClient.get(`/basicAuth`,{ headers: {'Authorization': `${token}`}})
export const authJWT = (username,password) => axiosClient.post(`/authenticate`,{username,password})
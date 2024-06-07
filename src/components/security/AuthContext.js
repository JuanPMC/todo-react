import { createContext, useState } from "react";
import { useContext } from "react";
import { authJWT, axiosClient, checkAuthId } from "../api/todoApiService";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}){
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username,setUsername] = useState("")
    const [authToken, setAuthToken] = useState("")

    async function login(username, password){

        try {

            const response = await authJWT(username,password)

            if(response.status == 200){

                const token = 'Bearer ' + response.data.token

                setAuthenticated(true)
                setUsername("pepe")
                setAuthToken(token)

                axiosClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = token
                        return config
                    }
                )

                return true
            }
            
        } catch (error) {
            return false
        }

        return false
    }

    function logout(){
        setAuthenticated(false)
        setUsername("")
        setAuthToken("")
    }

    return (
        <AuthContext.Provider value={{isAuthenticated,login,logout,username,authToken}}>{children}</AuthContext.Provider>
    )
}
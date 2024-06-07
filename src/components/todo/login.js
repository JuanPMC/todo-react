import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

function Login() {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [loginState,setLoginState] = useState(true)
    
    const navegate = useNavigate()
    const context = useAuth()


    async function handleLogin(){
        if (await context.login(username,password) ){
            navegate("/welcome/pepe")
        }else{
            setLoginState(false)
        }
    }


    return (
      <div className="Login">
        <h1>Login</h1>
        {!loginState && "Error in login!" }
        <div className="LoginForm">
            <div>     
                <label>Username:</label>
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}></input>
            </div>
            <div>     
                <label>Password:</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
            </div>
            <div>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
      </div>
    );
  }
  
  export default Login;
  
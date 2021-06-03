import React, {useContext,useRef} from 'react'
import "./Login.css"
import {Link} from "react-router-dom"
 
import axios from "axios"
import {Context} from "../context/Context"

function Login() {
    const userRef=useRef()
    const passwordRef=useRef()
    const{dispatch,isFetching}=useContext(Context)
    
  
    const handleSubmit=async(e)=>{
        e.preventDefault()
         dispatch({type:"LOGIN_START"})
        
        try{
            const res= await axios.post("http://localhost:5000/auth/login",{
                username:userRef.current.value,
                password:passwordRef.current.value

            })
               dispatch({type:"LOGIN_SUCCESS",payload:res.data})
               

            
        }catch(err){
            dispatch({type:"LOGIN_FAILURE"})

        }
    }
    
    

    
    return (
        <div className="login">
            <form className="login__form"onSubmit={handleSubmit}>
                <label>Username</label>
                <input 
                className="login__input" 
                type="text"
                placeholder="Enter your Name"
                ref={userRef}
                
                />
                <label>password</label>
                <input 
                className="login__input"
                 type="password" 
                 placeholder="Enter your Password"
                 ref={passwordRef}
                
                
                 
                 />
                <button className="login__button" type ="submit">Login</button>
               
            </form>
            <button className="login__registerButton">
                <Link className="link" to="/register">Register</Link>
            </button>
          
            
        </div>
    
    );
}


export default Login

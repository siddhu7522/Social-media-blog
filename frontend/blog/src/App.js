import React, { useContext } from 'react'
import "./App.css"
import Home from './Home/Home'
import NavBar from './NavBar/NavBar'
import Single from './Single/Single'
import UserSettings from './UserSettings/UserSettings'
import Write from './Write/Write'
import Login from "./Login/Login"
import Register from './Register/Register'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import { Context } from './context/Context'



function App() {
  const {user}=useContext(Context);
  return (
    <div className="app">
     <Router>
          
          <NavBar/>
     
     <Switch>
       <Route path="/"exact>
         <Home/>

       </Route>
       <Route path="/login">

        {user ?<Home/>:<Login/>}
       </Route>
       <Route path="/register">

        {user ?<Home/> : <Register/>}
         
          </Route>
         
          
          <Route path="/write">

       {user?<Write/>:<Register/>}
          </Route>
          {/* <Route path="/Usersettings">
          {user?<UserSettings/>:<Register/>}
        
          </Route> */}
          <Route path="/usersettings">
            <UserSettings/>
          </Route>
          <Route path="/post/:postId">

        <Single/>
          </Route>
       
     </Switch>

     </Router>
      
      
      
      
    </div>
  )
}

export default App

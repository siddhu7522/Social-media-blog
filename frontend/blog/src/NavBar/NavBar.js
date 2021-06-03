import React, { useContext } from 'react'
import "./NavBar.css"
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {Avatar} from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';
import {Link} from "react-router-dom"
import Login from '../Login/Login';
import { Context } from '../context/Context';
function NavBar() {
    const {dispatch,user}=useContext(Context)
    const PF="http://localhost:5000/images/"
    const handleLogout=()=>{
         dispatch({type:"LOGOUT"})
    }
    return (
        <div className="nav">
        <div className="nav__left">
            <FacebookIcon className="social__icon"/>
            <InstagramIcon className="social__icon"/>
            <LinkedInIcon className="social__icon"/>
            
        </div>
        <div className="nav__center">
            <ul className="nav__list">
                <li className="nav__listItem">
                    <Link className="link" to="/">HOME</Link></li>
                <li className="nav__listItem">
                    <Link className="link" to="/">ABOUT</Link></li>
                <li className="nav__listItem">
                    <Link className="link" to="/">CONTACT</Link></li>
                <li className="nav__listItem">
                    <Link className="link" to="/write">WRITE</Link></li>
                <li className="nav__listItem"onClick={handleLogout}>
                    {user && "LOGOUT"}</li>
            </ul>
        </div>
        <div className="nav__right">
            {user?(
                <Link to="/usersettings">
                 <Avatar src={user.profilePic}/>
                </Link>
                

            ):(
                <ul className="nav__list">
                    <li className="nav__listItem">
                    <Link className="link" to="/login">LOGIN</Link>

                    </li>
                    <li className="nav__listItem">
                    <Link className="link" to="/register">REGISTER</Link>

                    </li>
               
               
                    </ul>

            )}
           
            <SearchIcon className="search__icon"/>

        </div>
        </div>
    )
}

export default NavBar

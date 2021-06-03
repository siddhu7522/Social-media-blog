import React,{useState,useEffect} from 'react'
import "./Sidebar.css"
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {Link} from "react-router-dom"
import axios from "axios"
function Sidebar() {
    const[categories,setCategories]=useState([])
    useEffect(()=>{
        const getCategory=async()=>{
            const res=await axios.get("http://localhost:5000/categories")
            setCategories(res.data)
        }
        getCategory()
    },[])
    return (
        <div className="sidebar">
            <div className="sidebar__item">
                <span className="sidebar__title">ABOUT ME</span>
                <img  src="https://res.cloudinary.com/demo/image/upload/sample.jpg"/>
                <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged

        
                </p>
            </div>
            <div className="sidebar__item">
                <span className="sidebar__title">CATEGORIES</span>
                <ul className="sidebar__list">
                    {categories.map(cats=>(
                        <Link className="link" to={`/?cats=${cats.name}`}>
                             <li className="sidebar__listItem">{cats.name}</li>

                        </Link>
                        

                    ))}
                   
                  
                </ul>
            </div>
            <div className="sidebar__item">
                <span className="sidebar__title">FOLLOW US</span>
                <div className="sidebar__social">
                <FacebookIcon className="social__icon"/>
            <InstagramIcon className="social__icon"/>
            <LinkedInIcon className="social__icon"/>
                </div>
            </div>
        </div>
    )
}

export default Sidebar

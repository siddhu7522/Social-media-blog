import React,{useState,useEffect, useContext} from 'react'
import "./SinglePost.css"
import {useLocation} from "react-router"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios"
import {Context} from "../context/Context"
import {Link} from "react-router-dom"
function SinglePost() {
    const location=useLocation()
    const path=location.pathname.split("/")[2];
    const[post,setPost]=useState({})
    const[title,setTitle]=useState("")
    const[desc,setDesc]=useState("")
    const[update,setUpdate]=useState(false)
    

    const PF="http://localhost:5000/images/"
    
    const {user}=useContext(Context)

    const handleDelete=async(e)=>{
        e.preventDefault()
        try{
            await axios.delete(`http://localhost:5000/posts/${post._id}`,{
                data:{username:user.username}
            })
           
            window.location.replace("/")

        }catch(err){}
        
    }
    const handleUpdate=async()=>{
        try{
            await axios.put(`http://localhost:5000/posts/${post._id}`,{
                username:user.username,title,desc,
            });
            setUpdate(false)
        }catch(err){}

    }
    useEffect(()=>{
        const getPost=async()=>{
            const res= await axios.get("http://localhost:5000/posts/"+path);
            console.log(res)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
        getPost()
    },[path])
    return (
        
        <div className="singlePost">
           <div className="singlPost__wrapper">
               {post.photo&&(
                    <img src={PF+post.photo}
                    className="singlePost__img"/>

               )}
               {update?
                   <input type="text" className="singlePost__titleInput"value={title}onChange={(e)=>setTitle(e.target.value)} />:(
                    <h1 className="singlePost__title">
                        {post.title}
                          
                {post.username===user?.username &&(
                    <div className="singlePost__edit">
                    <EditIcon className="singlePost__icon"onClick={()=>setUpdate(true)}/>
                    <DeleteIcon className="singlePost__icon"onClick={handleDelete}/>
                </div>
                )}
 
                

               
              </h1>

                   )
            
                }
              
               <div className="singlePost__info">
                   <span className="singlePost__author">
                
                       Author:<Link className="link" to={`/?user=${post.username}`}>
                       {post.username}
                           </Link> 
                   </span>
                   <span className="singlePost__date">{new Date(post.createdAt).toDateString()}</span>
               </div>
               {update?(
                   <textarea className="singlepost__descInput"value={desc}onChange={(e)=>setDesc(e.target.value)}/>
               ):(
                <p className="singlePost__desc">
                {desc}
               </p>

               )}
               {update&& 
                <button className="singlePost__button"onClick={handleUpdate}>Update</button>
               
               }
              
               
           </div>
        
            
        </div>
    )
               }
    
    

export default SinglePost

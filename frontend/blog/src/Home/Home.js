import React,{useState,useEffect} from 'react'
import Header from '../Header/Header'
import Posts from '../posts/Posts'
import Sidebar from '../Sidebar/Sidebar'
import "./Home.css"
import axios from "axios"
import {useLocation} from "react-router"

function Home() {
    const[posts,setPosts]=useState([])
    const {search}=useLocation()
  useEffect(()=>{

    const fetchPosts=async()=>{
      const getPosts=await axios.get("http://localhost:5000/posts"+search)
      
      setPosts(getPosts.data)
    }
    fetchPosts()

  },[search])
    return (
        <>
        <Header/>
        <div className="home">
            
            <Posts posts={posts}/>
            <Sidebar/>
            
        </div>
        </>
    )
}

export default Home

import React from 'react'
import "./post.css"
import {Link} from "react-router-dom"
function post({post}) {
    const PF="http://localhost:5000/images/"
    return (
        <div className="post">
            {post.photo && (
                 <img className="post__img"
                    src={PF+post.photo}
                 />

            )}
           
            <div className="post__info">
                <div className="post__cats">
                    {post.categories.map(c=>(
                         <span className="post__cat">{c.name}</span>

                    ))}
               
                <span className="post__cat">Life</span>

                </div>
               <Link className="link" to={`/post/${post._id}`}>
                   <span className="post__title">{post.title}</span>
               </Link>
                      
            
               
           
            <hr/>
            <span className="post__date">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <div className="post__desc">
                <p>
                {post.desc}
                </p>
            </div>
        </div>
    )
}

export default post

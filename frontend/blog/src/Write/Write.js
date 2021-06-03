import React,{useContext, useState} from 'react'
import "./Write.css"
import AddBoxIcon from '@material-ui/icons/AddBox';
import axios from "axios"
import { Context } from '../context/Context';
function Write() {
    const[title,setTitle]=useState("")
    const[desc,setDesc]=useState("")
    const[file,setFile]=useState(null)
    const {user}=useContext(Context)
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const newPost={
            username:user.username,
            title,
            desc
        }
        if(file){
            const data=new FormData()
            const filename=Date.now()+file.name
            data.append("name",filename)
            data.append("file",file)
            newPost.photo=filename;
            try{
                await axios.post("http://localhost:5000/upload",data)

            }catch(err){}
        }
        try{
           const res= await axios.post("http://localhost:5000/posts",newPost)
            window.location.replace("/post/"+res.data._id)

        }catch(err){

        }
        


    }
    return (
        <div className="write">
            {file &&(
                 <img className="write__image"
                 src={URL.createObjectURL(file)}
                 />

            )}
           
            <form className="write__form"onSubmit={handleSubmit}>
                <div className="writeForm__group">
                    <label htmlFor="fileInput">
                        <AddBoxIcon className="write__icon"/>
                    </label>
                    <input 
                    type="file"
                    id="fileInput"
                     style={{display:"none"}}
                     onChange={(e)=>setFile(e.target.files[0])}

                     />
                    <input
                     type="text"
                     placeholder="Title" 
                     className="write__input"
                     autoFocus={true}
                     onChange={(e)=>setTitle(e.target.value)}
                     />
                </div>
                <div className="writeForm__group">
                    <textarea placeholder="Tell Your Story..."
                    type="text"
                    className="write__input write__text"
                    onChange={(e)=>setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className="write__submit">Publish</button>
            </form>
        </div>
    )
}

export default Write

import React, { useContext,useState } from "react"
import "./UserSettings.css";
import Sidebar from "../Sidebar/Sidebar";
import { Context } from "../context/Context";
import axios from "axios"
 function UserSettings() {
   const[file,setFile]=useState(null)
   const[username,setUsername]=useState("")
   const[email,setEmail]=useState("")
   const[password,setPassword]=useState("")
   const[success,setSuccess]=useState(false)
   const{user,dispatch}=useContext(Context)
   const PF = "http://localhost:5000/images/"
  const handleSubmit=async(e)=>{
    e.preventDefault()
    dispatch({type:"UPDATE_START"})
    const updatedUser={
      userId:user._id,
      username,
      email,
      password,
      
    }
    if(file){
      const data=new FormData()
      const filename=Date.now()+file.name
      data.append("name",filename)
      data.append("file",file)
      updatedUser.profilePic=filename;
      try{
          await axios.post("http://localhost:5000/upload",data)

      }catch(err){}
  }
  try{
    const res= await axios.put("http://localhost:5000/users/"+user._id,updatedUser)
    setSuccess(true)
    dispatch({type:"UPDATE_SUCCESS",payload:res.data})
    console.log(res)
     

 }catch(err){
  dispatch({type:"UPDATE_FAILURE"})

 }
 
  }


  return (
    <div className="user__settings">
      <div className="user__settingsWrapper">
        <div className="user__settingsTitle">
          <span className="user__settingsTitleUpdate">Update Your Account</span>
          <span className="user__settingsTitleDelete">Delete Account</span>
        </div>
        <form className="user__settingsForm"onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="user__settingsPP">
            <img
              src={file ? URL.createObjectURL(file):PF+ user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="user__settingsPPIcon fa fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="user__settingsPPInput"
              onChange={(e)=>setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text"
           placeholder={user.username}
           onChange={(e)=>setUsername(e.target.value)}
            name="name"
            
            />
          <label>Email</label>
          <input type="email" 
          placeholder="siddhureddy7522@gmail.com"
           name="email"
           onChange={(e)=>setEmail(e.target.value)}
           
           />
          <label>Password</label>
          <input type="password" placeholder="Password" name="password"onChange={(e)=>setPassword(e.target.value)} />
          <button className="user__settingsSubmitButton" type="submit">
            Update
          </button>
          {success &&(
            <span style={{color:"green"}}>Profile has been updated</span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
export default UserSettings
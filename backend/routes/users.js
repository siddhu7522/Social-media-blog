const express=require("express")
const router=express.Router()
const User=require("../models/User")
const bcrypt=require("bcrypt")
const Post=require("../models/Post")
const { findById } = require("../models/User")

//UPDATE USER


router.put("/:id",async(req,res)=>{
    if(req.body.userId===req.params.id){
        if(req.body.password){
            const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(req.body.password,salt)
        }
        try{
            const updatedUser=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})
            res.status(200).json(updatedUser)
        }catch(err){
            res.status(500).json(err)

        }
    }
    else{
        res.json("You can update only your account not others")
    }
})



//DELETE USER

router.delete("/:id",async(req,res)=>{
    if(req.body.userId===req.params.id){
        try{
            const user=await User.findById(req.params.id)
        try{
            await Post.deleteMany({username:user.username})
            const deletedUser=await User.findByIdAndDelete(req.params.id)
            res.status(200).json(deletedUser)
               
           

        }catch(err){
            res.status(404).json(err)
        }

        }catch(err){
            res.status(404).json("User not found")

        }
    }else{
        res.status(401).json("You can delete only your account and not others")
    }

})


//GET USERS


router.get("/:id",async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const{password,...others}=user._doc;
        res.status(200).json(others)

    }catch(err){
        res.status(500).json(err)

    }

})




module.exports=router
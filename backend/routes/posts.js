const express=require("express")
const app=express()
const router=express.Router()
const cors=require("cors")
const Post=require("../models/Post")

//CREATE POST
app.use(cors())
router.post("/",async(req,res)=>{
    const newPost=new Post(req.body)
    try{
        const savedPost=await newPost.save()
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err)

    }

})

//UPDATE A POST

router.put("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        if(post.username===req.body.username){
            try{
                const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true})
                res.status(200).json(updatedPost)
            
            }catch(err){
                res.status(500).json(err)
            }
        }else{
            res.json("You can update only your post not others")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE POST

router.delete("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        if(post.username===req.body.username){
            try{
                const deletedPost=await Post.findOneAndDelete(req.params.id)
                res.status(200).json(deletedPost)
            }catch(err){
                res.status(500).json(err)
            }
        }else{
            res.status(500).json("You can delete only your post not others post")
        }

    }catch(err){
        res.json(err)
    }
})

//GET POST

router.get("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
       res.status(200).json(post)

    }catch(err){
        res.status(500).json(err)

    }
})

//GET ALL POSTS

router.get("/",async(req,res)=>{
    const username=req.query.user
    const categoryname=req.query.category
    try{
        let posts;
        if(username){
            posts=await Post.find({username})
        }
        else if(categoryname){
            posts=await Post.find({categories:{
                $in:[categoryname]
            }})
        }else{
            posts=await Post.find()
        }
        res.status(200).json(posts)


    }catch(err){
        res.json(err)

    }
})




module.exports=router
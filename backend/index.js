const express=require("express")
const mongoose=require("mongoose")
const  dotenv=require("dotenv")
const app=express()
const authRoute=require("./routes/auth")
const userRoute=require("./routes/users")
const postRoute=require("./routes/posts")
const categoryRoute=require("./routes/categories")
const multer=require("multer")
const path=require("path")
const cors=require("cors")
dotenv.config()
app.use(express.json())
app.use(cors())
app.use("/images",express.static(path.join(__dirname,"/images")))




mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
  useFindAndModify:true})
    .then(console.log("connected successfully"))
    .catch((err)=>console.log(err));

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "images");
        },
        filename: (req, file, cb) => {
          cb(null, "hello.png");
        },
      });
      
      const upload = multer({ storage: storage });
      app.post("/upload", upload.single("file"), (req, res) => {
        res.status(200).json("File has been uploaded");
      });

    
app.use("/auth",authRoute)
app.use("/users",userRoute)
app.use("/posts",postRoute)
app.use("/categories",categoryRoute)

    
app.listen(5000,()=>{
    console.log("server is runnning")
})
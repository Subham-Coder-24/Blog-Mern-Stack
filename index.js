const express = require("express");
const cors = require("cors");
const { db } = require("./connection");
const path = require('path')

const BlogModel = require("./models/blogmodels");
const app = express();
const PORT = 5000;

db();

app.use(express.json());
app.use(cors());

app.get("/blogs", async (req, res) => {
  const blogs = await BlogModel.find();
  if (!blogs) {
    res.status(404).json({ message: "No blogs found" });
  }
  res.send({ blogs });
});

app.delete("/delete-blog/:id", async (req, res) => {
  const blogs = await BlogModel.findByIdAndDelete(req.params.id);
  if (!blogs) {
    res.status(404).json({ message: "No blogs found" });
  }
  res.status(200).json({ message: "Blog Succesfully Deleted", blogs });
});

app.put("/update-blog/:id", async (req, res) => {
  const { title, description } = req.body;
  // console.log(title,description);

  const blogs = await BlogModel.findById(req.params.id);
  if (!blogs) {
    res.status(404).json({ message: "No blogs found" });
  }

  if(!title && !description){
    res.json({message:"Please Enter title and description"})
  }else if(!title){
    blogs.description = description;
  }else if(!description){
    blogs.title = title;
  }else{
    blogs.title = title;
    blogs.description = description;
  }

  await blogs.save();
  res.status(200).json({ message: "Blog Succesfully Upadted", blogs });
});

app.post("/post-blog", async (req, res) => {
  const blog = new BlogModel({
    title: req.body.title,
    description: req.body.description,
  });
  await blog.save();

  res.status(200).json({ message: "Blog Succesfully Upadted", blog });
});

app.get("/",( req,res)=>{
  app.use(express.static(path.resolve(__dirname,"client","dist")))
  res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})

app.listen(PORT, () => {
  console.log(`Serveris running on port ${PORT}`);
});

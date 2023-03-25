const mongoose =require("mongoose")
const express=require("express")
const Blog=require("./model/blogmodel")

mongoose.connect("mongodb://localhost:27017/Blog", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port=8080
const app=express()

app.get("/blog", async (req, res) => {
    const { page, search } = req.query;
    const query = search ? { topic: { $regex: search, $options: "i" } } : {};
    const blogs = await Blog.find(query)
    res.json({ status: "success", result: blogs });
  });

app.post("/blog", async (req, res) => {
   
    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    res.json({ status: "success", result: savedBlog });
  });
  
  app.put("/blog/:id", async (req, res) => {
    const { topic, description, posted_by } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { topic, description, posted_by }, { new: true });
    res.json({ status: "success", result: updatedBlog });
  });
  
  app.delete("/blog/:id", async (req, res) => {
   
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    res.json({ status: "success", result: deletedBlog });
  });
  

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
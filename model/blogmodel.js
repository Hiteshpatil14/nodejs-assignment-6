const mongoose =require("mongoose")

const blogschema=new mongoose.Schema({
   
        topic: String,
        description: String,
        posted_at: { type: Date, default: Date.now },
        posted_by: String,
 
})

const blogmodel=mongoose.model("blog",blogschema)
 module.exports=blogmodel
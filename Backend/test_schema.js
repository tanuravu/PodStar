const mongoose =require('mongoose');
const { Schema,ObjectId } = mongoose;
const album = require("./models/album");
const conn=async() =>{
    try{
        
        await mongoose.connect('mongodb://localhost:27017/PODCAST');
        console.log("Database connected");
    }
    catch(e){
        console.log(error);
    }
};

conn();
/*
const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  desc: String
  });
  
  const blogschema = mongoose.model('blog', blogSchema);
  
const data = new blogschema({
	title:"c,cpp, java",
	author:"taranpreet",
	desc:"detail book for interview question"
});/*
data.save().then(()=>{
	console.log("data saved");
}); */
const data = new album({title:"test",description:"test",coverImage:"upload/test.jpg"});
console.log(data);
data.save().then((result,error)=>{
	if(error)
		 console.log(error);
	console.log(result);
	
})
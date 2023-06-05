import mongoose from "mongoose";



async function connectToMongoose() {
    try{
        
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

    }
    catch(error){
        console.log("error:", error)
    
    }
}
connectToMongoose()

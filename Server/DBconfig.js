import mongoose from "mongoose";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const uri = "mongodb+srv://taha:taha@blogmaster.0odyxwk.mongodb.net/?retryWrites=true&w=majority&appName=BlogMaster";
const connectDB = ()=>{
    try {
        mongoose.connect(uri,clientOptions)
         .then(() => console.log('Connected!'))
         .catch(()=> console.log("not connected!"))
       } catch (error) {
         console.log(error)
       }
       
}

export default connectDB

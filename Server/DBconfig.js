import mongoose from "mongoose";

const connectDB = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
         .then(() => console.log('Connected!'))
         .catch(()=> console.log("not connected!"))
       } catch (error) {
         console.log(error)
       }
       
}

export default connectDB

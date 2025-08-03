import mongoose from "mongoose";




const Connection_db =async ()=>{

        return await mongoose.connect("mongodb+srv://cycle41:cycle41@cluster0.e09gpvw.mongodb.net/movies")
        .then(res=>console.log("ConnectionDB is Running........"))
        .catch(err=>console.log({message:"fail in ConnectionDB" , err}))
}









export default Connection_db

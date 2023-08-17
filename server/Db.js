const mongoose = require('mongoose');
const URI = "mongodb://localhost:27017/inotebook"



const connectToMongo = async() =>{
   try{

    await mongoose.connect(URI)
    console.log("connected to mogodb successfully, start the work")

   } catch(error){

    console.log(error)
   }
}

module.exports = connectToMongo;
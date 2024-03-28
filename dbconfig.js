const mongoose=require("mongoose")

function ConnectToDataBase(){
    const URI=process.env.NODE_URI==="production"?process.env.NODE_URI:"mongodb://localhost:27017/Task";
    mongoose.connect(URI).then((response)=>{
        if(response)console.log("Database connection successful.")
    }).catch((err)=>console.log("Database connection failled."));  
}





module.exports={
    ConnectToDataBase,
};
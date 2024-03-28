const mongoose=require("mongoose");
//to create schema

const TaskSchema=mongoose.Schema({
    Name:{type:String,required:true,unique:true},
    completed:{type:Boolean,default:false},
    category:{type:String,required:true},
},{timestamps:true}
);

const TaskModel=mongoose.model("task",TaskSchema)



module.exports=TaskModel;
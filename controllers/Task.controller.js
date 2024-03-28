const TaskRouter=require("express").Router();
const { default: mongoose } = require("mongoose");
const TaskModel=require("../model/Task.model")


// TaskRouter.get("/",(req,res,next)=>{
//     TaskModel.find().then((response)=>{
//         if(response){
//             res.status(200).json({
//                 success:true,
//                 message:"Todo fetched successfully",
//                 data:response,
//             });
//         }
//     }).catch((err)=>{
//         res.status(200).json({
//             success:true,
//             error:err,  
//             message:"Internal Server Error"
//         });
//     });

// });


//to get all data

TaskRouter.get("/",async(req,res,next)=>{

    try{
        const response=await TaskModel.find().limit(req.query.limit || 2).select({__v:0});
        if(response.length>0){
            return res.status(200).json({
                success:true,
                message:"Todo fetched successfully",
                data:response,
            });
        }else{
            return  res.status(200).json({
                success:true,
                message:"No Task Found",
                data:response,
            });
        }
    } catch(err){
        return res.status(500).json({
            success:true,
            error:err,  
            message:"Internal Server Error"
        });
    }
        });

//to create new data

TaskRouter.post("/create",async(req,res,next)=>{
     const NewTask=new TaskModel(req.body);
     try{
       const response= await NewTask.save();
       if(response && response._id  ){
        return res.status(200).json({
            success:true,
            message:"Task is created successfully",
            data:response,
        });
       }else{
        return res.status(400).json({
            success:false,
            message:"Something went wrong",
        })
       }
     }catch(err){
        return res.status(500).json({
            success:false,
            error:err,  
            message:"Internal Server Error"
        });
     }
      });


      //to update data
      TaskRouter.put("/update/:id",async(req,res,next)=>{
        try{
            const response=await TaskModel.findOneAndUpdate({_id:new mongoose.Types.ObjectId(req.params.id)},req.body,{new:true});
            if(response && response.id){
                return res.status(200).json({
                    success:true,
                    message:"Task Is Updated Successfully",
                    data:response,
                })

            }else{
                return res.status(400).json({
                    success:false,
                    message:"Something Went Wrong"
                })
            }
        }catch(err){
            return res.status(500).json({
                success:false,
                error:err,  
                message:"Internal Server Error"
            });
        }
         });

//To delete data

         TaskRouter.delete("/delete/:id",async(req,res,next)=>{
            try{
                const response=await TaskModel.findOneAndDelete(new mongoose.Types.ObjectId(req.params.id));
                if(response && response.id){
                    return res.status(200).json({
                        success:true,
                        message:"Task Is deleted Successfully",
                        data:response,
                    })
    
                }else{
                    return res.status(400).json({
                        success:false,
                        message:"Something Went Wrong"
                    })
                }
            }catch(err){
                return res.status(500).json({
                    success:false,
                    error:err,  
                    message:"Internal Server Error"
                });
            }
           });  



module.exports=TaskRouter;

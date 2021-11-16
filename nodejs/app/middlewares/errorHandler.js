const ErrorResponse =require("../utlis/error")

const errorHandler=(err,req,res,next)=>{
    console.log(err);

    let error={...err};
    error.message=err.message;

    if(err.name==="CastError"){
        const message="Resource not found";
        error=new ErrorResponse(message,404);
    }
    if(err.code===23505){
        const message="Duplicate field Value entered";
        error=new ErrorResponse(message,400)
    }
    if(err.name==="validationError"){
        const message=Object.values(err.errors).map((error)=>error.message).join(", ");
        error=new ErrorResponse(message,400)
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        const message="Duplicate field Found in Database"
        error=new ErrorResponse(message,409) //message:constants.DUPLICATE_RECORD
      }
      
    req.status(error.statusCode  || 500).json({
        success:false,error:error.message ||"server Error"
    });
}

module.exports=errorHandler;
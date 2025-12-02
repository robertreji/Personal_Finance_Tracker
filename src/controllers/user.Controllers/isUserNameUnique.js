import { User } from "../../models/user.model.js";
import { apiError } from "../../utils/apiError.util.js";
import apiResponse from "../../utils/apiResponse.util.js";
import { asyncHandler } from "../../utils/asyncHandler.util.js";


export const isUniqueUsername = asyncHandler(async(req,res,next)=>{
    const {username}  = req.body

    if(!username)
    {
        throw apiError(400,"username didint recieved !")
    }

   const user_exist = await User.findOne({
        username:username
    })

    if(user_exist) return  res.status(400).json(new apiResponse(400,"username already taken "))
    
    return next()

   
})
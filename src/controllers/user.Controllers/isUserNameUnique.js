import { User } from "../../models/user.model.js";
import { apiError } from "../../utils/apiError.util.js";
import apiResponse from "../../utils/apiResponse.util.js";
import { asyncHandler } from "../../utils/asyncHandler.util.js";


export const isUniqueUsername = asyncHandler(async(req,res)=>{
    const {username}  = req.body

    if(!username)
    {
        throw apiError(400,"username didint recieved !")
    }

   const user_exist = await User.findOne({
        username:username
    })

    if(user_exist) return  res.json(new apiResponse(200,false,"username already taken "))
    
    return   res.status(200).json(new apiResponse(200,true,"username is available"))
})
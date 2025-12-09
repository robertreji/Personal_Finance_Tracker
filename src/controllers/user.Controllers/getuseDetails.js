import { apiError } from "../../utils/apiError.util.js";
import { asyncHandler } from "../../utils/asyncHandler.util.js";
import  apiResponse from "../../utils/apiResponse.util.js"
export const getUserDetails =asyncHandler(async(req,res)=>{
    const user = req.user

    if(!user)throw apiError(403,"user didint recieved !")
    res.json(new apiResponse(200,{user},"user details "))
}) 
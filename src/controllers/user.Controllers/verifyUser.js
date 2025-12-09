import { User } from "../../models/user.model.js";
import { apiError } from "../../utils/apiError.util.js";
import { asyncHandler } from "../../utils/asyncHandler.util.js";
import jwt from "jsonwebtoken"
export const verifyUser = asyncHandler(async(req,res,next)=>{

    const {accessToken} = req.cookies 
    if(!accessToken) throw apiError(401,"acesstoken didint recieved !")
    try {
      const decoded = jwt.verify(accessToken,process.env.ACESS_TOKEN_SECRET)
      const user = await User.findById(decoded._id).select("-password -refresh_Token")
      if(!user) throw apiError(401,"unauthorized user!")
        console.log("from verify user user verified.....")
      req.user =user
      next()
    } catch (error) {
      console.log("user not verified ..")
      throw   apiError(401,"user not authenticated !")
    }
})
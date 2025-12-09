import { User } from "../../models/user.model.js";
import {apiError} from "../../utils/apiError.util.js";
import { asyncHandler } from "../../utils/asyncHandler.util.js";
import jwt from "jsonwebtoken"


export const refreshTokens =asyncHandler((async(req,res)=>{
    
    const {refreshToken} = req.cookies

        if(!refreshToken) throw apiError(401,"no refreshtoken recieved!")
    
        try {
            const decoded =  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
    
            const user =await User.findById(decoded._id).select("-password")
            if(!user) throw apiError(401,"user not found or unauthorized!")

            if(user.refresh_Token !==refreshToken)throw apiError(401,"refresh token does not matches!")
            console.log("token refreshed............")
            const newAccessToken = user.generateAcesstoken()
            const newRefreshToken = user.generateRefreshtoken()
        
            await User.findByIdAndUpdate(user._id,
                {
                    refresh_Token:newRefreshToken
                },
                {
                    new:true
                }
            )
        
            const acessTokenOptions={
                httpOnly : true,
                secure :false,
                maxAge : 60*2*1000,
                sameSite :"lax",
                path :"/"
        
            }
            const refreshTokenOptions={
                httpOnly : true,
                secure :false,
                maxAge : 60*3*1000,
                sameSite :'lax',
                path :"/"
            }
    
         return res.status(200).cookie("accessToken",newAccessToken,acessTokenOptions)
            .cookie("refreshToken",newRefreshToken,refreshTokenOptions)
            .json(new apiResponse(200,{},"tokens updateded  sucessfully !"))
    
        } catch (error) {
            throw apiError(401,"token expired or invalid!")
        }
 
}))
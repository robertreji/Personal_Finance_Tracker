import { User } from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.util.js";


export const logout = asyncHandler(async (req,res,next)=>{

    const user= req.user
    
    await User.findByIdAndUpdate(user._d,{
    refresh_Token:""
    })

    const accessTokenOptions={
        httpOnly : true,
        secure :false,
        maxAge : 60*15*1000,
        sameSite :"lax"
    }
    const refreshTokenOptions={
        httpOnly : true,
        secure :false,
        maxAge : 30*24*60*60*1000,
        sameSite :'lax'
    }

    res.clearCookie("accessToken",{...accessTokenOptions,maxAge:0})
    res.clearCookie("refreshToken",{...refreshTokenOptions,maxAge:0})

    res.status(200).json("logeded out")

})
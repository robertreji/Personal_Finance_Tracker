import { User } from "../../models/user.model.js";
import { apiError } from "../../utils/apiError.util.js";
import apiResponse from "../../utils/apiResponse.util.js";
import { asyncHandler } from "../../utils/asyncHandler.util.js";


export const signIn = asyncHandler(async (req,res)=>{

    const {username,password} = req.body

    if(!username || !password )throw apiError(400,"all fields are required !")

    const  FoundUser = await User.findOne({username:username.toLowerCase()})

    if(!FoundUser) throw apiError(400,"user does not exist!")

    const passcrct =await  FoundUser.isPasswordCorrect(password)
    
    if(!passcrct) throw apiError(400,"password is incorrect.please try again!")
    
    const AccessToken = await FoundUser.generateAcesstoken()
    const RefreshToken = await FoundUser.generateRefreshtoken()

    await User.findByIdAndUpdate(FoundUser._id,{
        refresh_Token:RefreshToken
    })

    const acessTokenOptions={
        httpOnly : true,
        secure :false,
        maxAge : 60*15*1000,
        sameSite :"lax",
        path :"/"

    }
    const refreshTokenOptions={
        httpOnly : true,
        secure :false,
        maxAge : 30*24*60*60*1000,
        sameSite :'lax',
        path :"/"
    }

    res.status(200).cookie("accessToken",AccessToken,acessTokenOptions)
    .cookie("refreshToken",RefreshToken,refreshTokenOptions)
    .json(new apiResponse(200,{},"user logged in sucessfully !"))

    })
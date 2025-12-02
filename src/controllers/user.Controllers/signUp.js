import { User } from "../../models/user.model.js"
import { apiError } from "../../utils/apiError.util.js"
import apiResponse from "../../utils/apiResponse.util.js"
import { asyncHandler } from "../../utils/asyncHandler.util.js"

export const signUp = asyncHandler(async (req,res) =>{

const {username,email,password} = req.body

if(!username || !email || !password) throw  apiError(400,"all fields are required !")

    const user =await  User.create({
        username:username,
        email:email,
        password:password
    })
res.status(200).json(new apiResponse(200,{user},"user signed up sucess fully "))
})
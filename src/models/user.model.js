import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({

    username : {
        type:String,
        require:true,
        unique:true,
        lowercase: true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    profilepic:{
        type:String
    },
    currency:{
        type:String,
        enum:{
            values:["INR","USD","EUR"],
            message:"invalid currency type!"
        },
        default:"INR"
    },
    otp:{
        type:Number
    },
    refresh_Token:{
        type:String
    }


},{timestamps:true})

userSchema.pre("save",async function (){
    if(!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAcesstoken=function(){
    return jwt.sign({
        _id :this._id,
        username :this.username
    },
    process.env.ACESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshtoken=function(){
    return jwt.sign({
        _id :this._id,
        username :this.username
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}


export const User = mongoose.model("users",userSchema)
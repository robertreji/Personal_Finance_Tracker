import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import { ErrorHandler } from "./middleware/ErrorHandler.middleware.js"

const server = express()

server.use(cors({
    origin:["http://localhost:3000"
    ],
    credentials:true
 }))

server.use(cookieParser())
server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.use("/api/v1/user",userRouter)


server.use(ErrorHandler)

export {server}


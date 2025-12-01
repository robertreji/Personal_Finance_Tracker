import dotenv from "dotenv" 
const  {default:connectdb} = await import("./db/dbconnect.js");
import {server} from "./server.js"

dotenv.config();

const port = process.env.PORT || 5000


await connectdb()
.then(()=>{
    server.on("error",()=>{
        console.error("unable to conect with the server ...")
    })
    server.listen(port,()=>{
        console.error("server running in port : ",port)
    })
})
.catch((err)=>{
    console.error("unable to connect with the server ...",err)
})

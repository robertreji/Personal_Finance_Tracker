import dotenv from "dotenv"
dotenv.config();

import connectdb from "./db/dbconnect.js";

await connectdb()
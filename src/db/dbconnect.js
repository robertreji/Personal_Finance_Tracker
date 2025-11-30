import mongoose from "mongoose"

export default async function connectdb(){
  try {
      const dbres = await mongoose.connect(`${process.env.DBURL}/${process.env.DBNAME}`);
      console.log("hodt id :",dbres.connection.host)
  } catch (error) {
    console.error("unable to connect with db !",error)
  }
}
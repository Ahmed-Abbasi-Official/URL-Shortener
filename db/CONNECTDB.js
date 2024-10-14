import mongoose from "mongoose";

async function CONNECTDB(url) {
   return  await mongoose.connect(url)
}

export default CONNECTDB
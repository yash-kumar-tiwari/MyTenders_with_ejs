import mongoose from "mongoose";

const url = "mongodb://localhost:27017/register_user";

mongoose.connect(url);

console.log("Connection Established Successfully with Database...")
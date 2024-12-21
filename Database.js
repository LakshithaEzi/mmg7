const mongoose = require("mongoose");
require("dotenv").config();
const uri = "mongodb+srv://Project_mmp7_finaldb:mmp7@projectmm7.bc4vi.mongodb.net/?retryWrites=true&w=majority&appName=projectmm7";



async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

module.exports = connectDB;

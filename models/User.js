const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  nic: { type: String, required: true },
  userRole: { type: String, enum: ["patient", "doctor", "pharmacist"], required: true },
  password: { type: String, required: true },
});

UserSchema.methods.comparePassword = function (password) {
  return this.password === password;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;

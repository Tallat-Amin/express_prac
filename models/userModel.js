const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    validate: [isEmail, "Please enter correct email"],
  },
  password: {
    type: String,
    required: [true, "password required in field"],
    minlength: [6, "minimum 6 char required for password"],
  },
});
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;

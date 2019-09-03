const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

var User = mongoose.model("User", userSchema, "user");

module.exports = User;

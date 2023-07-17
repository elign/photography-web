const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Full name not entered"],
  },

  email: {
    type: String,
    unique: [true, "Email already exist in the Database"],
    lowercase: true,
    trim: true,
    required: [true, "Email not provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Email provided is incorrect",
    },
  },

  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
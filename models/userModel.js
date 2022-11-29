const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide an Name!"],
    },
    email: {
      type: String,
      required: [true, "Please provide an Email!"],
      unique: [true, "Email Exist"],
      lowercase: true,
    },

    phoneNo: {
      type: Number,
    },

    password: {
      type: String,
      required: [true, "Please provide a password!"],
      unique: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);

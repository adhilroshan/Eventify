const mongoose = require("mongoose");

const HostSchema = new mongoose.Schema(
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

    password: {
      type: String,
      required: [true, "Please provide a password!"],
      unique: false,
    },

    phoneNo: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model.Host || mongoose.model("Hosts", HostSchema);

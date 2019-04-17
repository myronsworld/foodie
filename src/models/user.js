const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    googleID: String,
    email: {
      type: String,
      trim: true,
      lowercase: true
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User

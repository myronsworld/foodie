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
userSchema.virtual('recipes', {
  ref: 'Recipe',
  localField: '_id',
  foreignField: 'chef'
})

const User = mongoose.model('User', userSchema)

module.exports = User

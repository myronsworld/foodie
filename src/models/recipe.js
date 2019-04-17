const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema(
  {
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    description: {
      type: String,
      required: true
    },
    foodType: {
      type: [String],
      required: true
    },
    cookTime: {
      type: Number,
      required: true
    },
    prepTime: {
      type: Number,
      required: true
    },
    ingredients: {
      type: [String],
      required: true
    },
    rating: {
      type: Number
    },
    serves: {
      type: Number,
      required: true
    },
    directions: {
      type: [String],
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe

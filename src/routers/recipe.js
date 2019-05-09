const express = require('express')
const router = new express.Router()
const Recipe = require('../models/recipe')
const loginRequired = require('../middleware/loginRequired')
const formData = require('../models/formData')

router.post('/api/recipe', loginRequired, async (req, res) => {
  const recipe = new Recipe({
    ...req.body,
    chef: req.user._id
  })

  try {
    await recipe.save()
    res.status(201).send(recipe)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/api/recipes/:id', loginRequired, async (req, res) => {
  const _id = req.params.id

  try {
    const recipe = await Recipe.findOne({ _id, chef: req.user._id })
    if (!recipe) {
      res.status(404).send()
    }
    res.send(recipe)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/api/formData', loginRequired, async (req, res) => {
  res.send(formData)
})

// router.get('/api/formData/ingredients', loginRequired, async (req, res) => {
//   res.send(ingredients)
// })

module.exports = router

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

router.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find({})

    res.send(recipes)
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

router.patch('/api/recipes/:id', loginRequired, async (req, res) => {
  // get all the keys for each update
  const updates = Object.keys(req.body)

  // create array of acceptable updates
  const allowedUpdates = [
    'foodType',
    'ingredients',
    'directions',
    'title',
    'description',
    'cookTime',
    'prepTime',
    'serves'
  ]

  // check if EVERY update is included in the allowedUpdates array
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  // return 400 code if false
  if (!isValidOperation) {
    return res.status(400).send({ error: 'invalid updates attempted!' })
  }

  try {
    const recipe = await Recipe.findOne({ _id: req.params.id, chef: req.user._id })

    if (!recipe) {
      return res.status(400).send()
    }

    updates.forEach((update) => (recipe[update] = req.body[update]))

    await recipe.save()

    res.send(recipe)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router

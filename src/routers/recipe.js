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

router.patch('/api/recipes/:id', loginRequired, async (req, res) => {
  const updates = Object.keys(req.body)

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

  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'invalid updates attempted!' })
  }

  try {
    const recipe = await Recipe.findOne({ _id: req.params.id, chef: req.user._id })
    console.log(recipe)
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

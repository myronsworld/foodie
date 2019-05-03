const express = require('express')
const router = new express.Router()
const Recipe = require('../models/recipe')
const loginRequired = require('../middleware/loginRequired')

router.post('/api/recipe', loginRequired, async (req, res) => {
  console.log(req.body)
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

module.exports = router

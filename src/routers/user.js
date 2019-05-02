const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const Recipe = require('../models/recipe')
const loginRequired = require('../middleware/loginRequired')

router.get('/profile', loginRequired, (req, res) => {
  res.send(req.user)
})

router.patch('/profile/update', loginRequired, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email']

  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidUpdate) {
    return res.status(400).send({ error: 'invalid update attempt' })
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update]
    })
    await req.user.save()
    res.send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/profile/recipes', loginRequired, async (req, res) => {
  try {
    const recipes = await User.findById(req.user._id)
      .populate('recipes')
      .exec((err, user) => {
        console.log(user.recipes)
      })
    if (!recipes) {
      return res.send(400).send()
    }
    res.status(200).send(recipes)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router

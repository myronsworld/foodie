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

router.get('/api/profile/recipes', loginRequired, async (req, res) => {
  try {
    await req.user
      .populate({
        path: 'recipes'
      })
      .execPopulate()
    res.send(req.user.recipes)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router

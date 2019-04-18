const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const loginRequired = require('../middleware/loginRequired')

router.get('/profile', loginRequired, (req, res) => {
  res.send('Your profile')
})

router.patch('/profile/update', loginRequired, async (req, res) => {
  console.log(req.body)
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

module.exports = router

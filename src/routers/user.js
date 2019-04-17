const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const loginRequired = require('../middleware/loginRequired')

router.get('/profile', loginRequired, (req, res) => {
  res.send('Your profile')
})

module.exports = router

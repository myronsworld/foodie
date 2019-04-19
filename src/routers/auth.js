const passport = require('passport')
const express = require('express')
const router = new express.Router()
const loginRequired = require('../middleware/loginRequired')

router.get(
  '/login',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)
router.get('/login/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/')
})

router.get('/api/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/api/current_user', loginRequired, (req, res) => {
  res.send(req.user)
})

module.exports = router

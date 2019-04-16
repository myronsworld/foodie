const passport = require('passport')
const express = require('express')
const router = new express.Router()

router.get(
  '/login',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)
router.get('/login/callback', passport.authenticate('google'), (req, res) => {
  console.log(req.user)
})
module.exports = router

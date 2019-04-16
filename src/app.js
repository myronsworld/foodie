const express = require('express')
const userRoutes = require('./routers/user')
const authRoutes = require('./routers/auth')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('./middleware/passport')
require('./db/mongoose')
const app = express()
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [`process.env.COOKIE_KEY`]
  })
)
app.use(passport.initialize(), passport.session())
app.use(express.json(), userRoutes, authRoutes)

module.exports = app

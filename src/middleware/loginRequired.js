const User = require('../models/user')

module.exports = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ Error: 'Must be logged in to perform this action' })
  }

  const user = await User.findOne({ _id: req.user._id })
  req.user = user

  next()
}

module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ Error: 'Must be logged in to perform this action' })
  }

  next()
}

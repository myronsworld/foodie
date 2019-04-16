const mongoose = require('mongoose')

const user = mongoose.connect(process.env.MONGODB_URL, {
  useNewURLParser: true,
  useCreatedIndex: true,
  useFindAnyModify: true
})

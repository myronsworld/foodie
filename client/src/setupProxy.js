const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(proxy(['/api/logout', '/login'], { target: 'http://localhost:5000' }))
}

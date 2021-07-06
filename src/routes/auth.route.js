const middleware = require('../middleware')
const controller = require('../controllers/auth.controller')

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept'
    )
    next()
  })

  app.post('/api/auth/register', middleware.isUserExist, controller.register)
}

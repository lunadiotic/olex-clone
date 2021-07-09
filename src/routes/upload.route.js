const middleware = require('../middleware')
const controller = require('../controllers/upload.controller')

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'authorization, Origin, Content-Type, Accept'
    )
    next()
  })

  app.post('/api/product/:id/upload', middleware.verifyToken, controller.upload)
  app.delete('/api/image/:id', middleware.verifyToken, controller.remove)
}

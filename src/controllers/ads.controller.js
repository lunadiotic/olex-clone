const db = require('../models')
const Product = db.product
const Image = db.image

exports.random = (req, res) => {
  Product.findAll({
    where: {
      sold: false,
    },
    limit: 10,
    order: db.sequelize.literal('rand()'),
    include: Image,
  })
    .then((result) => {
      res.status(200).json({
        data: result,
        message: 'show random products success',
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      })
    })
}

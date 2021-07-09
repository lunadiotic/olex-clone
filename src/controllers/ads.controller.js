const db = require('../models')
const Product = db.product
const Image = db.image
const User = db.user

exports.detail = (req, res) => {
  id = req.params.id
  Product.findByPk(id, {
    include: [
      { model: Image, as: 'images' },
      {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      },
    ],
  })
    .then((result) => {
      res.status(200).json({
        data: result,
        message: 'show product success',
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      })
    })
}

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

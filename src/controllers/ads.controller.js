const db = require('../models')
const Product = db.product
const Image = db.image
const User = db.user
const Op = db.Sequelize.Op

exports.search = (req, res) => {
  const lat = parseFloat(req.query.lat)
  const lng = parseFloat(req.query.lng)
  const { title } = req.query
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null

  Product.findAll({
    attributes: {
      include: [
        [
          db.sequelize.literal(
            `6371 *
            acos(cos(radians(${lat})) * cos(radians(loc_latitude)) *
            cos(radians(${lng}) - radians(loc_longitude)) +
            sin(radians(${lat})) * sin(radians(loc_latitude)))`
          ),
          'distance',
        ],
      ],
    },
    where: {
      sold: false,
      ...condition,
    },
    having: db.sequelize.where(db.sequelize.col('distance'), '<', 25),
    order: db.sequelize.col('distance'),
    limit: 10,
    include: Image,
  })
    .then((result) => {
      res.status(200).json({
        data: result,
        message: 'list products success',
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      })
    })
}

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

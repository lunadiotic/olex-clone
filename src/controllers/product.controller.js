const db = require('../models')
const Product = db.product

exports.index = (req, res) => {
  Product.findAll({
    where: {
      user_id: req.userId,
    },
  })
    .then((result) => {
      res.status(200).json({
        data: result,
        message: 'show all products success',
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      })
    })
}

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).json({
      message: 'title must be required',
    })
    return
  }

  const product = {
    user_id: req.userId,
    ...req.body,
  }

  Product.create(product)
    .then((result) => {
      res.status(201).json({
        data: result,
        message: 'product created successfully',
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      })
    })
}

exports.show = (req, res) => {
  const id = req.params.id

  Product.findByPk(id)
    .then((result) => {
      if (result.user_id != req.userId) {
        res.status(401).json({
          message: 'unauthorized data product',
        })
        return
      }

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

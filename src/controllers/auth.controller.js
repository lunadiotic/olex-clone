const config = require('../config/auth')
const db = reqiure('../models')
const User = db.user
const bcrypt = require('bcryptjs')

exports.register = (req, res) => {
  User.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      res.status(201).json({
        message: 'user was registered sucessfully!',
        ...user,
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      })
    })
}

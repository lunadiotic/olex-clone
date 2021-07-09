const db = require('../config/database')

db.user = require('./user.model')(db.sequelize, db.Sequelize)
db.category = require('./category.model')(db.sequelize, db.Sequelize)
db.product = require('./product.model')(db.sequelize, db.Sequelize)
db.image = require('./image.model')(db.sequelize, db.Sequelize)

db.product.hasMany(db.image, {
  foreignKey: 'product_id',
})

db.product.belongsTo(db.user, {
  foreignKey: 'user_id',
})

db.category.hasMany(db.product, {
  foreignKey: 'category_id',
})

db.user.hasMany(db.product, {
  foreignKey: 'user_id',
})

module.exports = db

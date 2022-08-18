const mysql         = require("mysql2")
const { Sequelize } = require("sequelize")
const connect       = require("../config/database") ()

const database = {}

database.sequelize          = Sequelize
database.mysql              = mysql
database.connect            = connect
database.product            = require("./model_product.js")             (connect, Sequelize)
database.product_type       = require("./model_product_type.js")        (connect, Sequelize)
database.product_attribute  = require("./model_product_attribute.js")   (connect, Sequelize)
database.product_sub1       = require("./model_product_sub1.js")        (connect, Sequelize)
database.product_sub2       = require("./model_product_sub2.js")        (connect, Sequelize)
database.product_detail     = require("./model_product_detail.js")      (connect, Sequelize)
module.exports              = database


const mysql         = require("mysql2")
const { Sequelize } = require("sequelize")
const connect       = require("../config/database") ()

const database = {}

database.sequelize          = Sequelize
database.mysql              = mysql
database.connect            = connect
database.product_type       = require("./model_product_type.js") (connect, Sequelize)
database.product_attribute  = require("./model_product_attribute.js") (connect, Sequelize)
module.exports              = database


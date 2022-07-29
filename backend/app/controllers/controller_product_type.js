const connect           = require("../models")
const { product_type }  = connect

exports.create = async (req, res) => {

  const data = {
    product_type_name : req.body.product_type_name,
    product_type_code : req.body.product_type_code
  }
  try {
    await product_type.create(data)
  } 
  catch (err) {
    // Create Table
    if (err.name == ("SequelizeDatabaseError")) {
      require("../models").connect.sync()
      product_type.create(data)
    }
  }

}

exports.get_all = async (req, res) => {

  try {
    const document = await product_type.findAll()
    res.send(document)
  } 
  catch (err) {
    // Create Table
    if (err.name == ("SequelizeDatabaseError")) {
      require("../models").connect.sync()
    }
  }
}

exports.get_one = (req, res) => {

}

exports.update = (req, res) => {

}

exports.delete = (req, res) => {

}



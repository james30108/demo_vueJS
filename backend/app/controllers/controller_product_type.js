const connect           = require("../models")
const { product_type }  = connect

exports.create = async (req, res) => {

  const data = {
    product_type_name : req.body.product_type_name,
    product_type_code : req.body.product_type_code
  }
  try {
    await product_type.create(data)
    res.send(data)
  } 
  catch (err) {
    // Create Table
    if (err.name == ("SequelizeDatabaseError")) {
      await require("../models").connect.sync()
      await product_type.create(data)
      res.send(data)
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

exports.get_one = async (req, res) => {

  get_all  = await product_type.findAll()

  id       =  req.params.id
  get_one  =  await product_type.findOne({
    where : { product_type_id : id }
  })
  .then ((doc) => {
    res.send({
      product_type       : get_all,
      product_type_id    : doc.product_type_id,
      product_type_name  : doc.product_type_name,
      product_type_code  : doc.product_type_code
    })
  })
}

exports.update = async (req, res) => {
  
  const id =  req.params.id;
  const product_type_name = req.body.product_type_name
  const product_type_code = req.body.product_type_code

  await product_type.update(
    { 
      product_type_name : product_type_name,
      product_type_code : product_type_code,
    },
    {
      where : { product_type_id : id }
    }
  )
  .then ((doc) => {
    res.sendStatus(200)
  })
  
}

exports.delete = async (req, res) => {
  
  id =  req.params.id;
  await product_type.destroy({
    where: { product_type_id : id }
  })
  .then ((doc) => {
    res.sendStatus(200)
  })
  
}
const connect      = require("../models")
const { product, product_type, product_attribute, product_detail } = connect

exports.create = async (req, res) => {

    const data = {
        product_name : req.body.product_name
    }
    try {
        await product.create(data)
        res.send(data)
    } 
    catch (err) {
        // Create Table
        if (err.name == ("SequelizeDatabaseError")) {
        await require("../models").connect.sync()
        await product.create(data)
        res.send(data)
        }
    }

}

exports.get_all = async (req, res) => {

    try {
        const document = await product.findAll()
        res.send(document)
    } 
    catch (err) {
        // Create Table
        if (err.name == ("SequelizeDatabaseError")) {
        require("../models").connect.sync()
        }
    }

}

exports.get_form = async (req, res) => {
    
    try {
        const type      = await product_type.findAll()
        const attribute = await product_attribute.findAll()
        res.send({
            product_type        : type,
            product_attribute   : attribute,
        })
    } 
    catch (err) {
        // Create Table
        if (err.name == ("SequelizeDatabaseError")) {
            require("../models").connect.sync()
        }
        console.log (err)
    }

}

exports.get_one = async (req, res) => {

    id       =  req.params.id
    get_one  =  await product.findOne({
        where : { product_id : id }
    })
    .then ((doc) => {
        res.send(doc)
    })
}

exports.update = async (req, res) => {
  
//   const id =  req.params.id;
//   const product_type_name = req.body.product_type_name
//   const product_type_code = req.body.product_type_code

//   await product_type.update(
//     { 
//       product_type_name : product_type_name,
//       product_type_code : product_type_code,
//     },
//     {
//       where : { product_type_id : id }
//     }
//   )
//   .then ((doc) => {
//     res.sendStatus(200)
//   })
  
}

exports.delete = async (req, res) => {
  
//   id =  req.params.id;
//   await product_type.destroy({
//     where: { product_type_id : id }
//   })
//   .then ((doc) => {
//     res.sendStatus(200)
//   })
  
}
const connect               = require("../models")
const { product_attribute } = connect

exports.create = async (req, res) => {

    const data = {
        product_attribute_name   : req.body.product_attribute_name,
        product_attribute_detail : JSON.stringify(req.body.product_attribute_detail)
        //product_attribute_detail : "test"
    }
    console.log (data)
    try {
        await product_attribute.create(data)
        res.send(data)
    } 
    catch (err) {
        // Create Table
        if (err.name == ("SequelizeDatabaseError")) {
            await require("../models").connect.sync()
            await product_attribute.create(data)
            res.send(data)
        }
        
    }

}

exports.get_all = async (req, res) => {

    try {
        const document = await product_attribute.findAll()
        res.send(document)
    } 
    catch (err) {
        // Create Table
        if (err.name == ("SequelizeDatabaseError")) {
            await require("../models").connect.sync()
        }
    }

}

exports.get_one = async (req, res) => {

    get_all  = await product_attribute.findAll()

    id       =  req.params.id
    get_one  =  await product_attribute.findOne({
        where : { product_attribute_id : id }
    })
    .then ((doc) => {
        res.send({
            product_attribute           : get_all,
            product_attribute_id        : doc.product_attribute_id,
            product_attribute_name      : doc.product_attribute_name,
            product_attribute_detail    : JSON.parse (doc.product_attribute_detail)
        })

    })

}

exports.update = async (req, res) => {
  
    const id                        =  req.params.id;
    const product_attribute_name    = req.body.product_attribute_name
    const product_attribute_detail  = req.body.product_attribute_detail

    await product_attribute.update(
        { 
            product_attribute_name      : product_attribute_name,
            product_attribute_detail    : JSON.stringify(product_attribute_detail),
        },
        {
        where : { product_attribute_id  : id }
        }
    )
    .then ((doc) => {
        res.sendStatus(200)
    })
  
}

exports.delete = async (req, res) => {
  
    id =  req.params.id;
    await product_attribute.destroy({
        where: { product_attribute_id : id }
    })
    .then ((doc) => {
        res.sendStatus(200)
    })
  
}
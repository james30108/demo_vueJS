const connect      = require("../models")
const { product, product_type, product_attribute, product_detail } = connect

exports.create = async (req, res) => {

    //console.log (req.body)
    const data = JSON.parse(req.body.data)

    //console.log (data.product_detail[0].product_catagory2)
    
    // for insert product detail
    data.product_detail
    const product_detail = data.product_detail[0].product_catagory2.forEach(element => {
        
        const data_product_detail = {
            product_detail_main         : "",
            product_detail_catagory1    : "",
            product_detail_catagory2    : element.id,
            product_detail_price        : element.product_price,
            product_detail_quantity     : element.product_quantity,
            product_detail_code         : element.product_code,
        }
        console.log (data_product_detail)
    })
    /*
    
    */
    const product_image_cover = req.files.product_image_cover ? req.files.product_image_cover[0].filename : ""
    const product_image_1 = req.files.product_image_1 ? req.files.product_image_1[0].filename : ""
    const product_image_2 = req.files.product_image_2 ? req.files.product_image_2[0].filename : ""
    const product_image_3 = req.files.product_image_3 ? req.files.product_image_3[0].filename : ""
    const product_image_4 = req.files.product_image_4 ? req.files.product_image_4[0].filename : ""
    const product_image_5 = req.files.product_image_5 ? req.files.product_image_5[0].filename : ""
    
    const data_product = {
        product_name        : data.product_name,
        product_code        : data.product_code,
        product_type        : data.product_type,
        product_attribute   : data.product_attribute,
        product_description : data.product_description,
        product_catagory1   : JSON.stringify(data.product_catagory.catagory1),
        product_catagory2   : JSON.stringify(data.product_catagory.catagory2),
        product_wait_status : data.product_wait_status,
        product_condition   : data.product_condition,
        product_image_cover : product_image_cover,
        product_image_1     : product_image_1,
        product_image_2     : product_image_2,
        product_image_3     : product_image_3,
        product_image_4     : product_image_4,
        product_image_5     : product_image_5,
    }
    // const data_product_detail = {

    // }

    //console.log (data_save)
    
    /*
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
    */
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
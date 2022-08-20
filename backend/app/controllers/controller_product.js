const connect      = require("../models")
const { product, product_type, product_attribute, product_detail, product_sub1, product_sub2 } = connect

exports.create = async (req, res) => {

    //console.log (req.body)
    const data = JSON.parse(req.body.data)
    //console.log (data.product_detail[0].product_catagory2)
    
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
        product_attribute   : JSON.stringify(data.product_attribute),
        product_description : data.product_description,
        product_sub1        : data.product_sub1.name,
        product_sub2        : data.product_sub2.name,
        product_weight      : data.product_weight,
        product_height      : data.product_height,
        product_width_x     : data.product_width_x,
        product_width_y     : data.product_width_y,
        product_wait_status : data.product_wait_status,
        product_condition   : data.product_condition,
        product_image_cover : product_image_cover,
        product_image_1     : product_image_1,
        product_image_2     : product_image_2,
        product_image_3     : product_image_3,
        product_image_4     : product_image_4,
        product_image_5     : product_image_5,
    }
    console.log (data_product)
    
    try {

        await product.create (data_product).then (result => {
            
            // insert sub1
            if (data.product_sub1.child.length > 0) {
                var i = 0
                data.product_sub1.child.forEach(element => {
                    const image_name            = "product_sub1_image_" + i
                    const product_sub1_image    = req.files[image_name] ? req.files[image_name][0].filename : ""
                    const data_sub1             = {
                        product_sub1_key    : result.dataValues.product_id,
                        product_sub1_main   : element.id,
                        product_sub1_name   : element.name,
                        product_sub1_image  : product_sub1_image,
                    }
                    product_sub1.create (data_sub1)
                    i++
                })
            }

            // insert sub2
            if (data.product_sub2.child.length > 0) {
                data.product_sub2.child.forEach(element => {
                    const data_sub2             = {
                        product_sub2_key    : result.dataValues.product_id,
                        product_sub2_main   : element.id,
                        product_sub2_name   : element.name
                    }
                    product_sub2.create (data_sub2)
                })
            }

            //for insert product detail
            if (data.product_detail.length > 0) {
                var i = 0
                for (let index of data.product_detail) {
                    index.child.forEach(element => {
                        const data_product_detail = {
                            product_detail_main         : result.dataValues.product_id,
                            product_detail_sub1         : index.product_detail_sub1,
                            product_detail_sub2         : element.product_detail_sub2,
                            product_detail_price        : element.product_detail_price,
                            product_detail_quantity     : element.product_detail_quantity,
                            product_detail_code         : element.product_detail_code,
                        }
                        product_detail.create (data_product_detail)
                    })
                    i++
                }
            }
            else {
                const data_product_detail = {
                    product_detail_main         : result.dataValues.product_id,
                    product_detail_price        : data.product_detail_price,
                    product_detail_quantity     : data.product_detail_quantity,
                }
                product_detail.create (data_product_detail)
            }
            
        }) 
        res.send(data_product)
        
    } 
    catch (err) {
        // Create Table
        if (err.name == ("SequelizeDatabaseError")) {
            await require("../models").connect.sync()
            //await product.create(data)
            res.send("Create Table Complete")
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
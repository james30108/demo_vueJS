const fs      = require("fs");
const connect = require("../models")
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

        const proxyHost = req.headers["x-forwarded-host"]
        const host      = proxyHost ? proxyHost : req.headers.host

        const data_product  = await product.findAll()
        const document      = []

        for (x in data_product) {
            //console.log (data_product[x].dataValues)
            var image = data_product[x].dataValues.product_image_cover != "" ? "http://" + host + "/assets/img/products/" + data_product[x].dataValues.product_image_cover : ""
            document.push ({
                product_id          : data_product[x].dataValues.product_id,
                product_name        : data_product[x].dataValues.product_name,
                product_code        : data_product[x].dataValues.product_code,
                product_image_cover : image,
            })
        }
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
    
    const proxyHost = req.headers["x-forwarded-host"]
    const host      = proxyHost ? proxyHost : req.headers.host

    type      = await product_type.findAll()
    attribute = await product_attribute.findAll()

    result      = {}
    id          =  req.params.id
    data_main   =  await product.findOne({
        where : { product_id : id }
    })
    data_detail = await product_detail.findAll({
        where : { product_detail_main : id }
    })
    data_sub1 = await product_sub1.findAll({
        where : { product_sub1_key : id }
    })
    data_sub2 = await product_sub2.findAll({
        where : { product_sub2_key : id }
    })
    result      = data_main.dataValues  

    // ข้อมูลตัวเลือกสินค้า
    result.form_product_type      = JSON.stringify (type)
    result.form_product_attribute = JSON.stringify (attribute)

    // ข้อมูลรูปภาพสินค้า
    result.product_image_cover = data_main.dataValues.product_image_cover  != "" ? "http://" + host + "/assets/img/products/" + data_main.dataValues.product_image_cover : ""
    result.product_image_1     = data_main.dataValues.product_image_1      != "" ? "http://" + host + "/assets/img/products/" + data_main.dataValues.product_image_1     : ""
    result.product_image_2     = data_main.dataValues.product_image_2      != "" ? "http://" + host + "/assets/img/products/" + data_main.dataValues.product_image_2     : ""
    result.product_image_3     = data_main.dataValues.product_image_3      != "" ? "http://" + host + "/assets/img/products/" + data_main.dataValues.product_image_3     : ""
    result.product_image_4     = data_main.dataValues.product_image_4      != "" ? "http://" + host + "/assets/img/products/" + data_main.dataValues.product_image_4     : ""
    result.product_image_5     = data_main.dataValues.product_image_5      != "" ? "http://" + host + "/assets/img/products/" + data_main.dataValues.product_image_5     : ""

    // ข้อมูลรายละเอียดสินค้า
    var array_detail = []
    if (data_main.dataValues.product_sub1 != "") {

        // เพิ่มข้อมูล sub1 ของสินค้า
        jason_sub1 = { name : data_main.dataValues.product_sub1, child : [] }
        data_sub1.forEach ((element) => jason_sub1.child.push(JSON.stringify(
            { 
                id   : element.dataValues.product_sub1_main, 
                name : element.dataValues.product_sub1_name 
            }
        )))
        result.product_sub1 = JSON.stringify (jason_sub1)
        
        for (let x in data_sub1) {

            // เพิ่ม sub1 ลงใน detail
            array_detail.push({
                product_detail_sub1 : data_sub1[x].dataValues.product_sub1_main,
                child : [],
            })

            // ค้นหา detail จากรหัสสินค้า และรหัส sub1
            data_detail_sub1 = await product_detail.findAll({
                where : { product_detail_main : id, product_detail_sub1 : data_sub1[x].dataValues.product_sub1_main}
            })

            for (y in data_detail_sub1) {
            
                array_detail.find(find_id => find_id.product_detail_sub1 === data_detail_sub1[y].dataValues.product_detail_sub1).child.push(JSON.stringify ({
                    product_detail_price    : data_detail_sub1[y].dataValues.product_detail_price,
                    product_detail_quantity : data_detail_sub1[y].dataValues.product_detail_quantity,
                    product_detail_sub2     : data_detail_sub1[y].dataValues.product_detail_sub2,
                    product_detail_code     : data_detail_sub1[y].dataValues.product_detail_code,
                }))
                
            }

        }

        result.product_detail = JSON.stringify (array_detail)
        
    }
    else {
        data_detail.forEach ((element) => (
            result.product_detail_price     =  element.dataValues.product_detail_price,
            result.product_detail_quantity  =  element.dataValues.product_detail_quantity
        ))
    }

    if (data_main.dataValues.product_sub2 != "") {
        jason_sub2 = { name : data_main.dataValues.product_sub2, child : [] }
        data_sub2.forEach ((element) => jason_sub2.child.push(JSON.stringify({ id : element.dataValues.product_sub2_main, name : element.dataValues.product_sub2_name })))
        result.product_sub2 = JSON.stringify (jason_sub2)
    }
    console.log (result)
    res.send(result)
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
  
    id =  req.params.id;

    data_main   =  await product.findOne({
        where : { product_id : id }
    })
    data_sub1 = await product_sub1.findAll({
        where : { product_sub1_key : id }
    })

    if (data_main.dataValues.product_image_cover != "") fs.unlinkSync("./app/public/assets/img/products/" + data_main.dataValues.product_image_cover)
    if (data_main.dataValues.product_image_1 != "") fs.unlinkSync("./app/public/assets/img/products/" + data_main.dataValues.product_image_1)
    if (data_main.dataValues.product_image_2 != "") fs.unlinkSync("./app/public/assets/img/products/" + data_main.dataValues.product_image_2)
    if (data_main.dataValues.product_image_3 != "") fs.unlinkSync("./app/public/assets/img/products/" + data_main.dataValues.product_image_3)
    if (data_main.dataValues.product_image_4 != "") fs.unlinkSync("./app/public/assets/img/products/" + data_main.dataValues.product_image_4)
    if (data_main.dataValues.product_image_5 != "") fs.unlinkSync("./app/public/assets/img/products/" + data_main.dataValues.product_image_5)
    
    for (let x in data_sub1) {
        if (data_sub1[x].dataValues.product_sub1_image != "") fs.unlinkSync("./app/public/assets/img/products/" + data_sub1[x].dataValues.product_sub1_image)
    }

    await product.destroy({
        where: { product_id : id }
    })
    await product_detail.destroy({
        where: { product_detail_main : id }
    })
    await product_sub1.destroy({
        where: { product_sub1_key : id }
    })
    await product_sub2.destroy({
        where: { product_sub2_key : id }
    })

    res.sendStatus(200)
  
}
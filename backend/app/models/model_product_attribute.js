module.exports = (mongoose, mongoosePaginate) => {

    // ออกแบบโครงสร้างในการจัดเก็บข้อมูล (Schema)
    let product_attribute_Schema = mongoose.Schema(
        {
            product_attribute_name   : String,
            product_attribute_child  : Object
        },
        { timestamps: true }
    )
    
    // Paginate
    product_attribute_Schema.plugin(mongoosePaginate)
    
    // สร้างโมเดล
    let ProductAttribute = mongoose.model("system_product_attribute", product_attribute_Schema)
    
    // ส่งออกโมเดล
    return ProductAttribute
    
}
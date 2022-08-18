module.exports = (connect, Sequelize) => {
    
    const ProductSub = connect.define("system_product_sub",{
            product_sub_id   : { 
                type            : Sequelize.INTEGER(11), 
                primaryKey      : true, 
                autoIncrement   : true, 
                field           : "product_sub_id",
                comment         : "ไอดีของตัวเลือกสินค้า" 
            },
            product_sub_main : { 
                type            : Sequelize.INTEGER(5), 
                allowNull       : false, 
                defaultValue    : 0,
                field           : "product_sub_main",
                comment         : "ไอดีหลัก"
            },
            product_sub_type : { 
                type            : Sequelize.INTEGER(1), 
                allowNull       : false, 
                defaultValue    : 1,
                field           : "product_sub_type",
                comment         : "ประเภทของตัวเลือกสินค้า มี 1 กับ 2"
            },
            product_sub_name : { 
                type            : Sequelize.STRING(100), 
                allowNull       : true, 
                defaultValue    : "",
                field           : "product_sub_name",
                comment         : "ชื่อของตัวเลือกสินค้า"
            },
            product_sub_image : { 
                type            : Sequelize.STRING(150), 
                allowNull       : true, 
                defaultValue    : "",
                field           : "product_sub_image",
                comment         : "รูปภาพปกตัวเลือกของสินค้า"
            },
        },
        {
            tableName       : "system_product_sub",
            timestamps      : false,
        }
    )
    
    //await ProductType.sync();

    return ProductSub;

}
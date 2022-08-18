module.exports = (connect, Sequelize) => {
    
    const ProductSub1 = connect.define("system_product_sub1",{
            product_sub1_id   : { 
                type            : Sequelize.INTEGER(11), 
                primaryKey      : true, 
                autoIncrement   : true, 
                field           : "product_sub1_id",
                comment         : "ไอดีของตัวเลือกสินค้า" 
            },
            product_sub1_key   : { 
                type            : Sequelize.INTEGER(5), 
                allowNull       : false, 
                defaultValue    : 0,
                field           : "product_sub1_key",
                comment         : "ไอดีสินค้าที่เชื่อม"
            },
            product_sub1_main   : { 
                type            : Sequelize.INTEGER(5), 
                allowNull       : false, 
                defaultValue    : 0,
                field           : "product_sub1_main",
                comment         : "ไอดีหลัก"
            },
            product_sub1_name : { 
                type            : Sequelize.STRING(100), 
                allowNull       : true, 
                defaultValue    : "",
                field           : "product_sub1_name",
                comment         : "ชื่อของตัวเลือกสินค้า"
            },
            product_sub1_image : { 
                type            : Sequelize.STRING(150), 
                allowNull       : true, 
                defaultValue    : "",
                field           : "product_sub1_image",
                comment         : "รูปภาพปกตัวเลือกของสินค้า"
            },
        },
        {
            tableName       : "system_product_sub1",
            timestamps      : false,
        }
    )

    return ProductSub1;

}
module.exports = (connect, Sequelize) => {
    
    const ProductSub2 = connect.define("system_product_sub2",{
            product_sub2_id   : { 
                type            : Sequelize.INTEGER(11), 
                primaryKey      : true, 
                autoIncrement   : true, 
                field           : "product_sub2_id",
                comment         : "ไอดีของตัวเลือกสินค้า" 
            },
            product_sub2_key   : { 
                type            : Sequelize.INTEGER(5), 
                allowNull       : false, 
                defaultValue    : 0,
                field           : "product_sub2_key",
                comment         : "ไอดีสินค้าที่เชื่อม"
            },
            product_sub2_main : { 
                type            : Sequelize.INTEGER(5), 
                allowNull       : false, 
                defaultValue    : 0,
                field           : "product_sub2_main",
                comment         : "ไอดีหลัก"
            },
            product_sub2_name : { 
                type            : Sequelize.STRING(100), 
                allowNull       : true, 
                defaultValue    : "",
                field           : "product_sub2_name",
                comment         : "ชื่อของตัวเลือกสินค้า"
            },
        },
        {
            tableName       : "system_product_sub2",
            timestamps      : false,
        }
    )

    return ProductSub2;

}
module.exports = (connect, Sequelize) => {
    
    //console.log ("create table")
    const ProductDetail = connect.define("system_product_detail",{
            product_detail_id   : { 
                type            : Sequelize.INTEGER(11), 
                primaryKey      : true, 
                autoIncrement   : true, 
                field           : "product_detail_id",
                comment         : "ไอดีสินค้า" 
            },
            product_detail_main : { 
                type            : Sequelize.INTEGER(11), 
                allowNull       : false, 
                defaultValue    : 1,
                field           : "product_detail_main",
                comment         : "ไอดีตารางสินค้าหลัก"
            },
            product_detail_sub1 : { 
                type            : Sequelize.INTEGER(5), 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_detail_sub1",
                comment         : "ไอดีรูปแบบสินค้าที่ 1"
            },
            product_detail_sub2 : { 
                type            : Sequelize.INTEGER(5), 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_detail_sub2",
                comment         : "ไอดีรูปแบบสินค้าที่ 2"
            },
            product_detail_price: { 
                type            : Sequelize.FLOAT, 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_detail_price",
                comment         : "ราคาสินค้า" 
            },
            product_detail_quantity : { 
                type            : Sequelize.INTEGER(10), 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_detail_quantity",
                comment         : "จำนวนสินค้า"
            },
            product_detail_code : { 
                type            : Sequelize.STRING(100), 
                allowNull       : true, 
                defaultValue    : "",
                field           : "product_detail_code",
                comment         : "รหัส SKU"
            },
            product_detail_status : { 
                type            : Sequelize.INTEGER(1), 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_detail_status",
                comment         : "สถานะสินค้า"
            },
        },
        {
            tableName       : "system_product_detail",
            timestamps      : false,
        }
    )

    return ProductDetail;

}
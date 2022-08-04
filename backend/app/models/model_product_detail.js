module.exports = (connect, Sequelize) => {
    
    //console.log ("create table")
    const ProductDetail = connect.define("system_product_detail",{
            product_detail_id   : { 
                type            : Sequelize.INTEGER(11), 
                primaryKey      : true, 
                autoIncrement   : true, 
                field           : "product_detail_id" 
            },
            product_detail_main : { 
                type            : Sequelize.INTEGER(11), 
                allowNull       : false, 
                defaultValue    : 1,
                field           : "product_detail_main" 
            },
            product_detail_name : { 
                type            : Sequelize.STRING(100), 
                allowNull       : false, 
                defaultValue    : "สินค้าทดสอบ",
                field           : "product_detail_name" 
            },
            product_detail_price: { 
                type            : Sequelize.INTEGER(10), 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_detail_price" 
            },
            product_detail_quantity : { 
                type            : Sequelize.INTEGER(10), 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_detail_quantity" 
            },
            product_detail_attribute : { 
                type            : Sequelize.INTEGER(100), 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_detail_attribute" 
            },
            product_detail_status : { 
                type            : Sequelize.INTEGER(1), 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_detail_status" 
            },
        },
        {
            tableName       : "system_product_detail",
            timestamps      : false,
        }
    )
    
    //await ProductType.sync();

    return ProductDetail;

}
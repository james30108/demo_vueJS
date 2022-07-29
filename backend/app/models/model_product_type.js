module.exports = (connect, Sequelize) => {
    
    //console.log ("create table")
    const ProductType = connect.define("system_product_type",{
            product_type_id     : { 
                type            : Sequelize.INTEGER(11), 
                primaryKey      : true, 
                autoIncrement   : true, 
                field           : "product_type_id" 
            },
            product_type_name   : { 
                type            : Sequelize.STRING(50), 
                allowNull       : false, 
                defaultValue    : "สินค้าทดสอบ",
                field           : "product_type_name" 
            },
            product_type_code   : { 
                type            : Sequelize.STRING(20), 
                allowNull       : false, 
                defaultValue    : "A",
                field           : "product_type_code" 
            },
            product_type_create : { 
                type            : Sequelize.DATE, 
                allowNull       : false, 
                defaultValue    : Sequelize.literal("CURRENT_TIMESTAMP"),
                field           : "product_type_create" 
            }
        },
        {
            tableName       : "system_product_type",
            timestamps      : false,
        }
    )
    
    //await ProductType.sync();

    return ProductType;

}
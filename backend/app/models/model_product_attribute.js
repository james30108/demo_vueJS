module.exports = (connect, Sequelize) => {
    
    //console.log ("create table")
    const ProductAttribute = connect.define("system_product_attribute",{
            product_attribute_id     : { 
                type            : Sequelize.INTEGER(11), 
                primaryKey      : true, 
                autoIncrement   : true, 
                field           : "product_attribute_id" 
            },
            product_attribute_name   : { 
                type            : Sequelize.STRING(50), 
                allowNull       : false, 
                defaultValue    : "คุณสมบัติทดสอบ",
                field           : "product_attribute_name" 
            },
            product_attribute_detail   : { 
                type            : Sequelize.TEXT, 
                allowNull       : false, 
                defaultValue    : "S,M,L,XL",
                field           : "product_attribute_detail" 
            },
            product_attribute_create : { 
                type            : Sequelize.DATE, 
                allowNull       : false, 
                defaultValue    : Sequelize.literal("CURRENT_TIMESTAMP"),
                field           : "product_attribute_create" 
            }
        },
        {
            tableName       : "system_product_attribute",
            timestamps      : false,
        }
    )
    
    //await ProductAttribute.sync();

    return ProductAttribute;

}
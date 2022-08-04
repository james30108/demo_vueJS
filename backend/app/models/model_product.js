module.exports = (connect, Sequelize) => {
    
    //console.log ("create table")
    const Product = connect.define("system_product",{
            product_id          : { 
                type            : Sequelize.INTEGER(11), 
                primaryKey      : true, 
                autoIncrement   : true, 
                field           : "product_id" 
            },
            product_name        : { 
                type            : Sequelize.STRING(100), 
                allowNull       : false, 
                defaultValue    : "สินค้าทดสอบ",
                field           : "product_name" 
            },
            product_code        : { 
                type            : Sequelize.STRING(100), 
                allowNull       : false, 
                defaultValue    : "A-0000001",
                field           : "product_code" 
            },
            product_type        : { 
                type            : Sequelize.INTEGER(10), 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_type" 
            },
            product_attribute   : { 
                type            : Sequelize.INTEGER(100), 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_attribute" 
            },
            product_description : { 
                type            : Sequelize.TEXT, 
                allowNull       : true, 
                defaultValue    : "สินค้าทดสอบ",
                field           : "product_description" 
            },
            product_status      : { 
                type            : Sequelize.INTEGER(1), 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_status" 
            },
            product_image_cover : { 
                type            : Sequelize.STRING(150), 
                allowNull       : true, 
                defaultValue    : "",
                field           : "product_image_cover" 
            },
            product_image_1     : { 
                type            : Sequelize.STRING(150), 
                allowNull       : true, 
                defaultValue    : "",
                field           : "product_image_1" 
            },
            product_image_2     : { 
                type            : Sequelize.STRING(150), 
                allowNull       : true, 
                defaultValue    : "",
                field           : "product_image_2" 
            },
            product_image_3     : { 
                type            : Sequelize.STRING(150), 
                allowNull       : true, 
                defaultValue    : "",
                field           : "product_image_3" 
            },
            product_image_4     : { 
                type            : Sequelize.STRING(150), 
                allowNull       : true, 
                defaultValue    : "",
                field           : "product_image_4" 
            },
            product_image_5     : { 
                type            : Sequelize.STRING(150), 
                allowNull       : true, 
                defaultValue    : "",
                field           : "product_image_5" 
            },
            product_create      : { 
                type            : Sequelize.DATE, 
                allowNull       : false, 
                defaultValue    : Sequelize.literal("CURRENT_TIMESTAMP"),
                field           : "product_create" 
            }
        },
        {
            tableName       : "system_product",
            timestamps      : false,
        }
    )
    
    //await ProductType.sync();

    return Product;

}
module.exports = (connect, Sequelize) => {
    
    //console.log ("create table")
    const Product = connect.define("system_product",{
            product_id          : { 
                type            : Sequelize.INTEGER(11), 
                primaryKey      : true, 
                autoIncrement   : true, 
                field           : "product_id" ,
                comment         : "ไอดีสินค้า"
            },
            product_name        : { 
                type            : Sequelize.STRING(100), 
                allowNull       : false, 
                defaultValue    : "สินค้าทดสอบ",
                field           : "product_name",
                comment         : "ชื่อสินค้า" 
            },
            product_code        : { 
                type            : Sequelize.STRING(100), 
                allowNull       : false, 
                defaultValue    : "A-0000001",
                field           : "product_code",
                comment         : "SKU หลัก" 
            },
            product_type        : { 
                type            : Sequelize.INTEGER(10), 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_type",
                comment         : "ประเภทสินค้า" 
            },
            product_attribute   : { 
                type            : Sequelize.TEXT, 
                allowNull       : true, 
                defaultValue    : "",
                field           : "product_attribute",
                comment         : "คุณลักษณะสินค้า"
            },
            product_description : { 
                type            : Sequelize.TEXT, 
                allowNull       : true, 
                defaultValue    : "",
                field           : "product_description",
                comment         : "ข้อมูลเพิ่มเติม"
            },
            product_sub1        : { 
                type            : Sequelize.STRING(100), 
                allowNull       : true, 
                defaultValue    : "",
                field           : "product_sub1",
                comment         : "รูปแบบสินค้าที่ 1" 
            },
            product_sub2        : { 
                type            : Sequelize.STRING(100), 
                allowNull       : true, 
                defaultValue    : "",
                field           : "product_sub2",
                comment         : "รูปแบบสินค้าที่ 2" 
            },
            product_weight      : { 
                type            : Sequelize.FLOAT, 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_weight",
                comment         : "น้ำหนักสินค้า (กก.)" 
            },
            product_height      : { 
                type            : Sequelize.INTEGER(5), 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_height",
                comment         : "ส่วนสูงของพัสดุ (ซม.)" 
            },
            product_width_x      : { 
                type            : Sequelize.INTEGER(5), 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_width_x",
                comment         : "ความกว้างของพัสดุ (ซม.)" 
            },
            product_width_y      : { 
                type            : Sequelize.INTEGER(5), 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_width_y",
                comment         : "ความยาวของพัสดุ (ซม.)" 
            },
            product_status      : { 
                type            : Sequelize.INTEGER(1), 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_status",
                comment         : "สถานะสินค้า" 
            },
            product_wait_status : { 
                type            : Sequelize.INTEGER(1), 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_wait_status",
                comment         : "สินค้าจัดส่งนานพิเศษ"
            },
            product_condition   : { 
                type            : Sequelize.INTEGER(1), 
                allowNull       : true, 
                defaultValue    : 0,
                field           : "product_condition",
                comment         : "สภาพสินค้า (0=มือหนึ่ง,1=มือสอง)"
            },
            product_image_cover : { 
                type            : Sequelize.STRING(150), 
                allowNull       : true, 
                defaultValue    : "",
                field           : "product_image_cover",
                comment         : "รูปปกสินค้า" 
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
            },
            product_update      : { 
                type            : Sequelize.DATE, 
                allowNull       : false, 
                defaultValue    : Sequelize.literal("CURRENT_TIMESTAMP"),
                field           : "product_update" 
            },
        },
        {
            tableName       : "system_product",
            timestamps      : false,
        }
    )
    
    //await ProductType.sync();

    return Product;

}
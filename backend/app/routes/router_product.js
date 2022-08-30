const controller = require("../controllers/controller_product")
const multer     = require("multer")
const router     = require("express").Router()

// Upload File
const storage_product = multer.diskStorage({
    
    destination : function(req, file, cb) { // ระบุตำแหน่งที่จะทำการเก็บไฟล์
        cb (null, "./app/public/assets/img/products")
    },
    filename : function(req, file, cb) { // ระบุชื่อไฟล์ใหม่เพื่อป้องกันการซ้ำกันของชื่อ
        cb (null, "product_" + Date.now() + "_" + Math.floor(Math.random() * 1001) + ".jpg")
    }

})

const upload_product = multer({ // เริ่มต้นอัปโหลด
    storage : storage_product
})

const upload_iamge = upload_product.fields ([
    { name: "product_image_cover", maxCount: 1 },
    { name: "product_image_1", maxCount: 1 },
    { name: "product_image_2", maxCount: 1 },
    { name: "product_image_3", maxCount: 1 },
    { name: "product_image_4", maxCount: 1 },
    { name: "product_image_5", maxCount: 1 },
    { name: "product_sub1_image_0", maxCount: 1 },
    { name: "product_sub1_image_1", maxCount: 1 },
    { name: "product_sub1_image_2", maxCount: 1 },
    { name: "product_sub1_image_3", maxCount: 1 },
    { name: "product_sub1_image_4", maxCount: 1 },
    { name: "product_sub1_image_5", maxCount: 1 },
    { name: "product_sub1_image_6", maxCount: 1 },
    { name: "product_sub1_image_7", maxCount: 1 },
    { name: "product_sub1_image_8", maxCount: 1 },
    { name: "product_sub1_image_9", maxCount: 1 }
])

// Create 
router.post("/", upload_iamge , controller.create)
// get_all 
router.get("/", controller.get_all)
// get_form 
router.get("/form", controller.get_form)
// get_one
router.get("/:id", controller.get_one)
// update
router.put("/:id", controller.update)
// delete
router.delete("/:id", controller.delete)

module.exports = router
const express       = require("express") // import Express เข้ามาทำงาน
const authorization = require('../config/authorize')
const router        = express.Router() // Router จะทำงานเกี่ยวกับระบบรับส่งข้อมูลทั้งหมด

//router.use("/api/create_tale", require("./router_create_tale"))
router.use("/", (req, res)=> {  
    res.send('Hello World!')
})
router.use("/login", require('./login'))
router.use("/api/product", authorization, require("./router_product"))
router.use("/api/product_type", authorization, require("./router_product_type"))
router.use("/api/product_attribute", authorization, require("./router_product_attribute"))

module.exports = router // ทำการ export 
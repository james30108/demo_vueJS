const express   = require("express") // import Express เข้ามาทำงาน
const router    = express.Router() // Router จะทำงานเกี่ยวกับระบบรับส่งข้อมูลทั้งหมด

router.use("/api/product_type", require("./router_product_type"))
//router.use("/api/create_tale", require("./router_create_tale"))
//router.use("/api/product_attribute", require("./router_product_attribute"))

module.exports = router // ทำการ export 
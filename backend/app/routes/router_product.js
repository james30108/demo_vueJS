const controller = require("../controllers/controller_product")
const router     = require("express").Router()

// Create 
router.post("/", controller.create)
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
const controller = require("../controllers/controller_product_attribute")
const router     = require("express").Router()

// Create 
router.post("/", controller.create)
// Retrieve all 
router.get("/", controller.findAll)
// Retrieve a single with id
router.get("/:id", controller.findOne)
// Update a with id
router.put("/:id", controller.update)
// Delete a with id
router.delete("/:id", controller.delete)

module.exports = router
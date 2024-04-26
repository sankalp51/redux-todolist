const router = require('express').Router();
const listControllers = require('../controllers/listControllers');
router.get("/get-list", listControllers.getAllItems)
router.post("/add-new-item", listControllers.addNewItem)
router.delete("/delete-item/:id", listControllers.deleteItem);
router.patch("/update-item/:id", listControllers.updateItem);


module.exports = router;
// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

router.get("/detail/:invId", invController.showItemDetail);
router.get("/", invController.buildManagementView);
router.get("/newClassification", invController.buildNewClassification);
router.get("/newInventory", invController.buildNewInventory);
module.exports = router;
// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

router.get("/detail/:invId", utilities.handleErrors(invController.showItemDetail));
// router.get("/", invController.buildManagementView);
// router.get("/newClassification", invController.buildNewClassification);
// router.get("/newInventory", invController.buildNewInventory);
module.exports = router;
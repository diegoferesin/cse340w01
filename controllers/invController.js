const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    try {
        const classification_id = req.params.classificationId
        const data = await invModel.getInventoryByClassificationId(classification_id)

        if (!data || data.length === 0) {
            return res
                .status(404)
                .send("Inventory data not found for the specified classification")
        }
        const grid = await utilities.buildClassificationGrid(data)
        let nav = await utilities.getNav()
        const className = data[0].classification_name
        res.render("./inventory/classification", {
            title: className + " vehicles",
            nav,
            grid,
        });
    } catch (err) {
        console.log("Error in invCont.buildByClassificationId: " + err);
        res.status(500).send(err);
    }
}

invCont.showItemDetail = async function (req, res) {
    try {
        const invId = req.params.invId;
        const itemDetails = await invModel.getInventoryItemDetailsById(invId);
        if (!itemDetails) {
            return res.status(404).send("Inventory item not found");
        }

        const grid = utilities.buildItemGrid(itemDetails);
        let nav = await utilities.getNav();

        const itemName =
            itemDetails.inv_year +
            " " +
            itemDetails.inv_make +
            " " +
            itemDetails.inv_model;

        res.render("./inventory/item-detail-view", {
            title: itemName,
            nav,
            grid,
        });
    } catch (error) {
        console.error("Error in showItemDetail:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = invCont;
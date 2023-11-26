const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications()
    let list = "<ul>"
    list += '<li><a href="/" title="Home page">Home</a></li>'
    data.rows.forEach((row) => {
        list += "<li>"
        list +=
            '<a href="/inv/type/' + row.classification_id + '" title="See our inventory of ' + row.classification_name +
            ' vehicles">' +
            row.classification_name +
            "</a>"
        list += "</li>"
    })
    list += "</ul>"
    return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function (data) {
    let grid
    if (data.length > 0) {
        grid = '<ul id="inv-display">'
        data.forEach(vehicle => {
            grid += '<li>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id
                + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + 'details"><img src="' + vehicle.inv_thumbnail
                + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + ' on CSE Motors" /></a>'
            grid += '<div class="namePrice">'
            grid += '<hr />'
            grid += '<h2>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
                + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
                + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
            grid += '</h2>'
            grid += '<span>$'
                + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
            grid += '</div>'
            grid += '</li>'
        })
        grid += '</ul>'
    } else {
        grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}

Util.buildItemGrid = function (itemDetails) {
    let grid = '<div id="item-display">';

    if (itemDetails) {
        grid += '<div class="img-details">';
        grid += '<img src="' + itemDetails.inv_image + '" alt="Image of ' + itemDetails.inv_make + ' ' + itemDetails.inv_model + ' on CSE Motors">';
        grid += '</div>';
        grid += '<div class="details">';
        grid += '<h2>' + itemDetails.inv_make + ' ' + itemDetails.inv_model + '</h2>';
        grid += '<p><strong>Price: $' + new Intl.NumberFormat('en-US').format(itemDetails.inv_price) + '</strong></p>';
        grid += '<p><strong>Description:</strong> ' + itemDetails.inv_description + '</p>';
        grid += '<p><strong>Color:</strong> ' + itemDetails.inv_color + '</p>';
        grid += '<p><strong>Mileage:</strong> ' + new Intl.NumberFormat('en-US').format(itemDetails.inv_miles) + ' miles</p>';
        grid += '</div>';
    } else {
        grid += '<p class="notice">Sorry, no details could be found for this inventory item.</p>';
    }

    grid += '</div>';
    return grid;
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util
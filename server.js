const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")


app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")


app.use(require("./routes/static"))
// app.get("/", function (req, res) {
//   res.render("index", { title: "Home" })
// })
app.get("/", baseController.buildHome)
// Inventory routes
app.use("/inv", inventoryRoute)

const port = process.env.PORT
const host = process.env.HOST
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})

const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")

app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")


app.use(require("./routes/static"))
//Index route
app.get("/", function (req, res) {
  res.render("index", { title: "Home" })
})

const port = 8888
const host = process.env.HOST


app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})

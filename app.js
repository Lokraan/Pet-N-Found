
const { app: { port } } = require("./config/config")
const express = require("express")
const app = express();

const router = require("./src/routes/index")
router(app)

console.log("Listening on " + port)

app.set("views", "./src/views")
app.set("view engine", "pug")

app.listen(port)

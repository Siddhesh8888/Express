const express = require("express");
const app = express();
const bodyparser = require("body-parser");
var path = require("path");
const routes = require("./router/routers");

//middleware
app.use(bodyparser.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, "public")));

app.use("/css", express.static(path.resolve(__dirname, "public/css")));
app.use("/js", express.static(path.resolve(__dirname, "public/js")));
app.use("/image", express.static(path.resolve(__dirname, "public/images")));

app.use("/", routes);

app.listen(3002, function () {
  console.log("server running at port 3002");
});

module.exports = app;

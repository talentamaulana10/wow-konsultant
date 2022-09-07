const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const Xendit = require("./constrolers/Xendit");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/xendit", Xendit);

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server running on port " + PORT));

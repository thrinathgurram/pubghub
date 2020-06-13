var express = require("express");
var mysql = require("mysql");
var router = express.Router();
var pool = require("./pool");
let table = "login";
// const client = require("twilio")(config.accountSID, config.authToken)

router.get("/", (req, res) => {
    res.render(`login`);
});

module.exports = router;
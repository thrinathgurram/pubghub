var express = require("express");
var mysql = require("mysql");
var router = express.Router();
var nodemailer = require('nodemailer');
var pool = require("./pool");
let table = "index";

router.get("/", (req, res) => {
  if (req.session.id) {
    var query = `select name,number from signup where id = "${req.session.id}";`
    var query1 = `select * from tournament`
    pool.query(query + query1, (err, result) => {
      if (err) throw err;
      else res.render(`index`, { login: true , result : result});
    });
  }
  else {
    res.render('index', { login: false });
  }
});

module.exports = router;

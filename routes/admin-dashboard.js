var express = require("express");
var mysql = require("mysql");
var router = express.Router();
var pool = require("./pool");
let table = "admin-dashboard";

router.get("/", (req, res) => {
    if (req.session.adminid) {
  
      var query = `select name,username from admin where id = "${req.session.adminid}"; `
      pool.query(query, (err, result) => {
        if (err) throw err;
        else res.render(`admin-dashboard`, { login: true , result : result});
     
      })
    }
    else {
      res.render('admin-login', { login: false });
    }
  });

module.exports = router;
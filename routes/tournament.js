var express = require("express");
var mysql = require("mysql");
var router = express.Router();
var pool = require("./pool");

let table = "tournament";

router.get("/", (req, res) => {
    if (req.session.id) {
  
      var query = `select name,number from signup where id = "${req.session.id}"; `
      pool.query(query, (err, result) => {
        if (err) throw err;
        else res.render(`tournament`, { login: true , result : result});
     
      })
    }
    else {
      res.render('login', { login: false });
    }
  });

module.exports = router;
var express = require("express");
var mysql = require("mysql");
var router = express.Router();
var pool = require("./pool");
let table = "add-tournament";

router.get("/", (req, res) => {
    if (req.session.adminid) {
      var query = `select name,username from admin where id = "${req.session.adminid}"; `
      pool.query(query , (err, result) => {
        if (err) throw err;
        else res.render(`poolprice`, { login: true , result : result});
      })
    }
    else {
      res.render('admin-login', { login: false });
    }
  });
  
  router.post("/insert",  (req, res) => {
    let body = req.body;
    body['adminid'] = req.session.adminid;
    pool.query(`insert into tournament set ?`, body, (err, result) => {
        if (err) throw err;
        else res.redirect("/add-tournament");
    });
});

// show game
router.get("/categorydetail", (req, res) => {
  const { adminid } = req.session.adminid
  var query = `select * from tournament where adminid = ${req.session.adminid}`;
  pool.query(query, (err, result) => {
    if (err) throw err;
    else res.json(result);
  });
});


module.exports = router;
var express = require("express");
var mysql = require("mysql");
var router = express.Router();
var pool = require("./pool");
let table = "tournament-detail";

router.get("/", (req, res) => {
  if (req.session.id) {
    global.id = req.query.id;
    var query = `select name,number from signup where id = "${req.session.id}"; `;
    var query1 = `select * from tournament where id = "${id}"`;
    var query2 = `select * from booking`;
    pool.query(query + query1, +query2, (err, result) => {
      if (err) throw err;
      else res.render(`tournament-detail`, { login: true, result: result });
    });
  } else {
    res.render("admin-login", { login: false });
  }
});

router.post("/booking", (req, res) => {
  let body = req.body;
  body["userid"] = req.session.id;
  body["tournamentid"] = global.id;

        pool.query(`insert into booking set ?` ,body, function(err , insert){
               if(err){
                   throw err;
               }else{
                 res.redirect("/account");
               }
           })                  
});

module.exports = router;

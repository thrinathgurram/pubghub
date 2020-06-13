var express = require("express");
var mysql = require("mysql");
var router = express.Router();
var pool = require("./pool");
let table = "admin-login";

router.get("/", (req, res) => {
    res.render(`admin-login`);
});


router.post("/adminlogin", (req, res) => {
    const { username, password } = req.body;
    var query = `select * from admin where username  = "${req.body.username}" and password = "${req.body.password}"`;
    pool.query(query, (err, result) => {
      if (err) throw err;
      else if (result[0]) {
        req.session.adminid = result[0].id;
  
        req.flash('success', 'Welcome Admin');
        res.redirect("/admin-dashboard");
      } else {
  
        req.flash('error', 'Account Not Found');
        res.redirect("/admin-login");
      }
    });
  });

    //admin logout function

    router.get("/admin-logout", (req, res) => {
      req.session.adminid = null;
      res.redirect("/admin-login");
    });

module.exports = router;
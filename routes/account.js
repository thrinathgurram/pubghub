var express = require("express");
var mysql = require("mysql");
var router = express.Router();
var pool = require("./pool");
let table = "account";

router.get("/", (req, res) => {
    if (req.session.id) {
      var query = `select name,number from signup where id = "${req.session.id}";`
      var query1 = `select d.*,(select h.tournamentname  from tournament h where h.id = d.tournamentid) as tournamentname,
      (select h.map from tournament h where h.id = d.tournamentid) as map 
      from booking d where userid =  "${req.session.id}" ;`
      pool.query(query + query1 , (err, result) => {
        if (err) throw err;
        else res.render(`account`, { login: true , result : result});
      });
    }
    else {
      res.render('login', { login: false });
    }
  });
  
module.exports = router;

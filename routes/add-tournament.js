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
        else res.render(`add-tournament`, { login: true , result : result});
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


router.post("/categoryinsert",  (req, res) => {
  let body = req.body;
  body['adminid'] = req.session.adminid;
  pool.query(`insert into category set ?`, body, (err, result) => {
      if (err) throw err;
      else res.redirect("/add-tournament");
  });
});

// show all category
router.get("/categorydetail", (req, res) => {
  const { adminid } = req.session.adminid
  var query = `select * from category where adminid = ${req.session.adminid}`;
  pool.query(query, (err, result) => {
    if (err) throw err;
    else res.json(result);
  });
});

router.get("/alldata", (req, res) => {
  const { adminid } = req.session.adminid
  var query = `select * from tournament where adminid = ${req.session.adminid}`;
  pool.query(query, (err, result) => {
    if (err) throw err;
    else res.json(result);
  }); 
});


// remove tournament
router.get('/removeteam', (req, res) => {
  const { id } = req.query
  pool.query(`delete from tournament where id = ${id}`, (err, result) => {

       if (err) throw err;
       else res.redirect('/add-tournament');
     
  })
})

module.exports = router;
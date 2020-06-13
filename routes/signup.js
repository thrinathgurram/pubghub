var express = require("express");
var mysql = require("mysql");
var router = express.Router();

var pool = require("./pool");
let table = "signup";

router.get("/", (req, res) => {
    res.render(`signup`);
});

// insert data 
// router.post("/insert", (req, res) => {
//     let body = req.body;
    
//     var check = pool.query(`select * from signup where number = "${req.body.number}" and gameid = "${req.body.gameid}"`)
    
//     if(!check) {
//       req.flash('success', 'Account Already Exists');
//     res.redirect("/signup");
//   } else {

//     pool.query(`insert into signup set ?`, body, (err, result) => {
//       if (err) throw err;
//       else res.redirect("/login");
//     });
    
//   }
//   });


router.post("/insert", (req, res) => {
  let body = req.body;

  pool.query("SELECT COUNT(*) AS cnt FROM signup WHERE number = ?" , 
body.number , function(err , data){
   if(err){
       console.log(err);
   }   
   else{
       if(data[0].cnt > 0){  
        req.flash('error', 'Account Already Exists');
        res.redirect("/signup")
       }else{
        pool.query(`insert into signup set ?` ,body, function(err , insert){
               if(err){
                   throw err;
               }else{
                 res.redirect("/login");
               }
           })                  
       }
   }
});
});

// check login 
  router.post("/all", (req, res) => {
    const { username, password } = req.body;
    var query = `select * from signup where number  = "${req.body.number}" and password = "${req.body.password}"`;
    pool.query(query, (err, result) => {
      if (err) throw err;
      else if (result[0]) {
        req.session.id = result[0].id;
  
        req.flash('success', 'Welcome To GameingHub');
        res.redirect("/");
      } else {
  
        req.flash('error', 'Account Not Found');
        res.redirect("/login");
      }
    });
  });


  // logout function
  router.get("/logout", (req, res) => {
    req.session.id = null;
    res.redirect("/");
  });
  

module.exports = router;
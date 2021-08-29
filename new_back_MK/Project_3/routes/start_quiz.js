var express = require('express');
var router = express.Router();

var data = [];

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect(process.env.DATABASE_URL, function (err, db) {
        if (err) throw err;
        var dbo = db.db("quiz");
        dbo.collection("questions").find({}).toArray(function(err, result) {
            if (err) throw err;
            data = result;
            db.close();
            });
        }); 
        res.render('start_quiz',{ data_questions : data });
      } else {
        req.flash('error', 'You must be logged in to access this page');
        res.redirect('/users/login');
      }
});

module.exports = router;

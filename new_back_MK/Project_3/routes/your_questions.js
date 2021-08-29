var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        var user = req.user;
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect(process.env.DATABASE_URL, function (err, db) {
            if (err) throw err;
            var dbo = db.db("quiz");
            dbo.collection("questions").find({}).toArray(function(err, result) {
                if (err) throw err;
                data = result;
                for( var i = 0; i < data.length; i++){ 
                    if ( data[i].owner !== user.username) { 
                        data.splice(i, 1); 
                    }
                }
                console.log(data)
                db.close();
                });
            }); 
            res.render('your_questions',{ data_questions : data });
        
      } else {
        req.flash('error', 'You must be logged in to access this page');
        res.redirect('/users/login');
      }
    });
    
module.exports = router;
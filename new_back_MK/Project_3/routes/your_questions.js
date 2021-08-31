var express = require('express');
var router = express.Router();

router.get('/', async function (req, res) {
    if (req.isAuthenticated()) {
        var user = req.user;
        var MongoClient = require('mongodb').MongoClient;
        await MongoClient.connect(process.env.DATABASE_URL, async function (err, db) {
            if (err) throw err;
            var dbo = db.db("quiz");
            await dbo.collection("questions").find({}).toArray(async function(err, result) {
                if (err) throw err;
                data = result;
                for( var i = 0; i < data.length; i++){ 
                    if ( data[i].owner !== user.username) { 
                        data.splice(i, 1); 
                    }
                }
                console.log(data)
                db.close();
                return res.json(data);
                });
            });
      } else {
        return res.sendStatus(401);
      }
    });
    
module.exports = router;

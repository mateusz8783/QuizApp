var express = require('express');
var router = express.Router();

var data = [];

router.get('/', async function (req, res) {
    if (req.isAuthenticated()) {
        var MongoClient = require('mongodb').MongoClient;
        await MongoClient.connect(process.env.DATABASE_URL, async function (err, db) {
        if (err) throw err;
        var dbo = db.db("quiz");
        await dbo.collection("questions").find({}).toArray(async function(err, result) {
            if (err) throw err;
            data = result;
            db.close();
            return res.json(data);
            });
        });
      } else {
        return res.sendStatus(401);
      }
});

module.exports = router;

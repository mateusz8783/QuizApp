var express = require('express');
var router = express.Router();

/* GET edit page. */
router.get('/', function(req, res){
    res.render('edit');
});

module.exports = router;

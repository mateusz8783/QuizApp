var express = require('express');
var router = express.Router();

/* GET edit page. */
router.get('/', function(req, res){
    if (req.isAuthenticated()) {
        res.render('edit');
      } else {
        req.flash('error', 'You must be logged in to access this page');
        res.redirect('/users/login');
      }
});

module.exports = router;

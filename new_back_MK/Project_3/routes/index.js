var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
	var user = req.user;
	res.render('index', {"user": user.name , "picture": user.profileimage});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/users/login');
}

module.exports = router;

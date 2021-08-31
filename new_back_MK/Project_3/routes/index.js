var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	if (req.isAuthenticated()) {
		return res.json(req.user);
	  } else {
		return res.sendStatus(401);
	  }
	
});

module.exports = router;

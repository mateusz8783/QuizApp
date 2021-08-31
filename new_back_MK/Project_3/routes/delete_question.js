var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});

var Question = require('../models/question');

/* GET edit page. */
router.get('/', function(req, res){
  if (req.isAuthenticated()) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(401);
  }
});

router.post('/',async function(req, res) {
  if (req.isAuthenticated()) {
    var _id = req.body.question_id;
    console.log(_id)
  
    req.checkBody('question_id','question_id field is required').notEmpty();

    // Check Errors
    var errors = req.validationErrors();
  
    if(errors){
        res.status(404).json({"error":errors});
    } else{
        try {
          const question = await Question.deleteOne({_id})

          if(question.deletedCount === 0){
              return res.status(404).json()
          }else{
            return res.sendStatus(200);
          }
        } catch (error) {
          return res.status(500).json({"error":error})
      }
      };
    } else {
      return res.sendStatus(401);
    }
  });

module.exports = router;

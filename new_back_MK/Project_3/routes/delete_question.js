var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});

var Question = require('../models/question');

/* GET edit page. */
router.get('/', function(req, res){
  if (req.isAuthenticated()) {
    res.render('delete_question');
  } else {
    req.flash('error', 'You must be logged in to access this page');
    res.redirect('/users/login');
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
        res.render('error', {
            errors: errors
        });
    } else{
        try {
          const question = await Question.deleteOne({_id})

          if(question.deletedCount === 0){
              return res.status(404).json()
          }else{
            req.flash('success', 'Question deleted successfully from the data base');
          }
        } catch (error) {
          return res.status(500).json({"error":error})
      }
  

      };
      res.location('/');
      res.redirect('/');
    } else {
      req.flash('error', 'You must be logged in to access this page');
      res.redirect('/users/login');
    }
  });

module.exports = router;

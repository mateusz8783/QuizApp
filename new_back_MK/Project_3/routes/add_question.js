var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './public/images'});

var Question = require('../models/question');

/* GET edit page. */
router.get('/', function(req, res){
    res.render('add_question');
});

router.post('/', upload.single('profileimage') ,function(req, res, next) {
    var question = req.body.question;
    var answer_1 = req.body.answer_1;
    var answer_2 = req.body.answer_2;
    var answer_3 = req.body.answer_3;
    var owner = req.user.username;
    var corr_ans = req.body.corr_ans;
  
    if(req.file){
        console.log('Uploading File...');
        var profileimage = req.file.filename;
    } else {
        console.log('No File Uploaded...');
        var profileimage = 'noimage.jpg';
    }
  
    // Form Validator
    req.checkBody('question','Question field is required').notEmpty();
    req.checkBody('answer_1','Answer_1 field is required').notEmpty();
    req.checkBody('answer_2','Answer_2 field is required').notEmpty();
    req.checkBody('answer_3','Answer_3 field is required').notEmpty();
    req.checkBody('corr_ans','Correct Answer field is required').notEmpty();
  
    // Check Errors
    var errors = req.validationErrors();
  
    if(errors){
        res.render('error', {
            errors: errors
        });
    } else{
        var newQuestion = new Question({
        question: question,
        answer_1: answer_1,
        answer_2: answer_2,
        answer_3: answer_3,
        owner: owner,
        corr_ans: corr_ans,
        profileimage: profileimage
      });
  
      Question.createQuestion(newQuestion, function(err, question){
        if(err) throw err;
        console.log(question);
      });
  
      req.flash('success', 'Question added successfully to the data base');
  
      res.location('/');
      res.redirect('/');
    }
  });

module.exports = router;

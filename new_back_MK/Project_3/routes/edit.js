var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './public/images'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

/* GET edit page. */
router.get('/', function(req, res){
    if (req.isAuthenticated()) {
        res.json(req.user);
      } else {
        return res.sendStatus(401);
      }
});

router.post('/',upload.single('profileimage') , async function(req, res, next) {
  if (req.isAuthenticated()) {
    var _id = req.user.id;

    var errors = req.validationErrors();
    if(errors){
      res.status(404).json({"error":errors});
    } else{
        try {
          console.log(_id)
          const user = await User.deleteOne({_id})

          if(user.deletedCount === 0){
              return res.status(404).json()
          }else{
            var name = req.body.name;
            var email = req.body.email;
            var username = req.body.username;
            var password = req.body.password;
            var password2 = req.body.password2;
          
            if(req.file){
              console.log('Uploading File...');
              var profileimage = req.file.filename;
            } else {
              console.log('No File Uploaded...');
              var profileimage = 'noimage.jpg';
            }
          
            // Form Validator
            req.checkBody('name','Name field is required').notEmpty();
            req.checkBody('email','Email field is required').notEmpty();
            req.checkBody('email','Email is not valid').isEmail();
            req.checkBody('username','Username field is required').notEmpty();
            req.checkBody('password','Password field is required').notEmpty();
            req.checkBody('password2','Passwords do not match').equals(req.body.password);
          
            // Check Errors
            var errors = req.validationErrors();
          
            if(errors){
              res.status(404).json({"error":errors});
            } else{
              var newUser = new User({
                name: name,
                email: email,
                username: username,
                password: password,
                profileimage: profileimage
              });
          
              User.createUser(newUser, function(err, user){
                if(err) throw err;
                console.log(user);
              });
          
              return res.json(newUser);
            }
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

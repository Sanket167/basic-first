var User = require('./userModel');
var router = require('express').Router();
var _ = require('lodash');
var signToken = require('../../auth/auth').signToken;
const multer = require('multer');
const upload = multer ({dest: 'uploads/'});
//var base64Img = require('base64-img');


exports.params = function(req, res, next, id) {
  User.findById(id)
    .then(function(user) {
      if (!user) {
        next(new Error('No user with that id'));
      } else {
        req.user = user;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  User.find({})
    .then(function(users){
      //console.log(username);
      //var pass=req.body.password;
      res.json(users);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var user = req.user;
  res.json(user);
};

exports.put = function(req, res, next) {
  var user = req.user;
  console.log(user);

  var update = req.body;
  console.log(update);
  _.merge(user, update);

  user.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

// exports.post = function(req, res, next) {
//   var newUser = new User(req.body);
//   newUser.save(function(err, user) {
//     if(err) {
//       next(err);
//     }
//     else{

//     var tok = signToken(user._id);
//     var username=req.body.username;
//     //console.log(username);
//     res.json({token: tok , username});
//   }
//   });



//  var newUser = req.body;
//   User.create(newUser)
//     .then(function(user) {
//       res.json(user);
//     }, function(err) {
//       next(err);
//     });
// };

/*router.post("/", (req, res, next ) => {
  var newUser = new User(req.body);
  newUser.save(function(err, user) {
    if(err) {
      next(err);
    }
    else{

    var tok = signToken(user._id);
    var username=req.body.username;
    //console.log(username);
    res.json({token: tok , username});
  }
})
});
*/

exports.delete = function(req, res, next) {
  req.user.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};

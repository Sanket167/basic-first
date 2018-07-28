var User = require('../api/user/userModel');
var signToken = require('./auth').signToken;
var crypto = require('crypto');
exports.signin = function(req, res, next) {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume //creating token


  var token = signToken(req.user._id); // working option


/*  var token = require('crypto').randomBytes(48, function(err, buffer) {
  var tok = buffer.toString('hex');
  console.log(tok);
  return tok;
	});*/
 //perfect working option randomly generating token
  //console.log(token);
  res.json({token: token, username:req.user.username, id:req.user._id});
};

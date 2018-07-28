var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./userController');
var User = require('./userModel');
var signToken = require('../../auth/auth').signToken;
const multer = require('multer');
const upload = multer ({dest: 'uploads/'});
var base64ToImage = require('base64-to-image');


router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  //.post(controller.post)


router.post("/",/* upload.single("img"),*/ (req, res, next ) => {

var newUser = new User(req.body);
//var token1="demo_token for save";
//console.log(newUser);
/*var token1 = "working token";
var n2 = new User(token1);
n2.save(function(err,user){
console.log(token1);
});*/
//console.log(token1);
/*newUser.save(function(err,token123) {
	   if(err) {
      next(err);
    }
    else{
    	//console.log(token123);
    }
})
*/
  var username=req.body.username;
  var body = req.body.image;
  var name1= req.body.username;
  var path="./uploads/"+name1;
  var path2="uploads/"+name1+".png";
  base64Data = body.replace(/^data:image\/png;base64,/,""),
  binaryData = new Buffer(base64Data, 'base64').toString('binary');
	require("fs").writeFile(path+".png", binaryData, "binary", function(err) {
  //console.log(err); // writes out file without error, but it's not a valid image
});


/*
var thing = new User({ path1: "true" });
    thing.save() /*/
// newUser.push({path: path2});


newUser.save(function(err, user) {
    if(err) {
      next(err);
    }
    else{

var token = signToken(user._id);
/*   	var token1 = "working token";
	var n2 = new User2(token1);
	n2.save(function(){
	console.log(token1);
	});
*/
    //var email= req.body.email;

  //console.log("working");




/*  $push function can be used to push an array element*/
  //console.log(token);
User.findById(user._id, function(err, user) {
    User.update({_id: user._id}, 
    {path2: path2 , token1:token}, function(err) {
    });
  });





/*  newUser.findByIdAndUpdate(
    req.body.username,
    {$push: {token: "demo push" }},
    {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
    }
);
*/



    //console.log(username);


    res.json({token: token , username, path2, _id:user._id});
  }
  	/*var base64Str = email;
  	console.log(base64Str);
	var path ='./user';
	//var optionalObj = {'fileName': 'demo', 'type':'png'};
   	base64ToImage(base64Str,path); */
})
});





router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = router;

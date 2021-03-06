var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var logger = require('./util/logger');
var auth = require('./auth/routes');
// db.url is different depending on NODE_ENV
require('mongoose').connect(config.db.url);

/*if (config.seed) {
  require('./util/seed');
}*/
// setup the app middlware
require('./middleware/appMiddlware')(app);

// setup the api
app.use('/api', api);
app.use('/auth', auth);

// set up global error handling
app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }


  //res.status(401).json({message : "wrong password"});

  
  logger.error(err.stack);
  res.status(500).json({message : err.message}); //if this user exists
});

// export the app for testing
module.exports = app;

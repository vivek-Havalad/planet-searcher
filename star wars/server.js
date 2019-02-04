var http = require('http');
var express = require('express');
var config = require('./config.json');
var app = express();
var server = http.createServer(app);

var config_views = require('./middleware/routesSetup.js')(express,app,config);
var calcObj = require('./middleware/calcEngine.js');
calcObj = new calcObj(config);
var routes = require('./middleware/routes.js')(express,app,config,calcObj);
app.use('/star_wars' , routes);
app.get('/' , (req,res)=>res.redirect('/star_wars'))

calcObj.loadJedi( resp  => {
  server.listen(config.port , res => {
    console.log("listening on port " , config.port);
  })
})

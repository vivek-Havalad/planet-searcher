var path = require('path');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
function config_view(express,app,config){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
      limit: '100mb',
      extended: true
  }));
	app.use(expressSession({
		secret: config.secretService,
	  resave: false,
	  saveUninitialized: true,
	  cookie: { maxAge : 3600000 }
	}))
	app.set('view engine', 'html');

	app.engine('html', require('ejs').renderFile);

	app.set('views', (__dirname + '/../views/html'));
	app.use('/images', express.static(__dirname + '/../views/images'));
	app.use('/styles', express.static(__dirname + '/../views/styles'));
	app.use('/scripts', express.static(__dirname + '/../views/scripts'));
}

module.exports = config_view;

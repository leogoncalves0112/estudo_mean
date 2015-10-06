var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var helmet = require('helmet');

module.exports = function() {
	var app = express();
	
	// vari�vel de ambiente
	app.set('port', 3000);

	// middleware
	app.use(express.static('./public'));
	app.set('view engine', 'ejs');
	app.set('views','./app/views');
	// novos middlewares
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());
	
	app.use(cookieParser());
	app.use(session(
		{ secret: 'homem avestruz',
		  resave: true,
		  saveUninitialized: true
		}
	));
	app.use(passport.initialize());
	app.use(passport.session());
	
	app.use(helmet.xframe()); // Evita que a aplica��o seja aberta por um frame ou iframe
	app.use(helmet.xssFilter()); // Prote��o de XSS
	app.use(helmet.nosniff()); // N�o permite no HTML uso de tipor que n�o sejam MIME (no HEADER : X-Content-Type-Options:nosniff)
	app.disable('x-powered-by'); // Disabilita o x-powered-by para n�o informar a tecnologia utilizada
	//app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' })); // Altera o x-powered-br para uma tecnologia fake
	//app.use(helmet()); //Habilita todo o Helmet
	
	load('models', {cwd: 'app'})
		.then('controllers')
		.then('routes')
		.into(app);
	//home(app);
	
	app.get('*', function(req, res) {
		res.status(404).render('404');
	});
	
	return app;
};
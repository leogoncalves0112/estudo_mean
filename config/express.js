var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var helmet = require('helmet');

module.exports = function() {
	var app = express();
	
	// variável de ambiente
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
	
	app.use(helmet.xframe()); // Evita que a aplicação seja aberta por um frame ou iframe
	app.use(helmet.xssFilter()); // Proteção de XSS
	app.use(helmet.nosniff()); // Não permite no HTML uso de tipor que não sejam MIME (no HEADER : X-Content-Type-Options:nosniff)
	app.disable('x-powered-by'); // Disabilita o x-powered-by para não informar a tecnologia utilizada
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
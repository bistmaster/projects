'use strict';

var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var app = express();

var allowCrossDomain = function (req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type");
	next();
};

app.configure(function() {
	app.set('view engine', 'ejs');
	app.set('views', 'app/views');	
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(allowCrossDomain);
	app.use(app.router);
	app.use(express.static('public/'));
});

// for development configuration of the middleware
app.configure('development',function () {
	app.set('dbUrl', 'mongodb://localhost:27017/networks');
	app.set('port', 3001);
	app.use(express.errorHandler());
});

// for production configuration of the middleware
app.configure('production', function(){
	app.use(function(err, req, res){
		res.json(500, {response: "Something wrong on the request"});
	});
});

// connect to mongodb
mongoose.connect(app.get('dbUrl'), function onMongooseError(err){
	if(err) {
		console.log('Error connecting to database', err);
		throw err
	} else {
		http.createServer(app).listen(app.get('port'), function onPortListen(){
			console.log('Server is up and listening to ' + app.get('port'));
		});
	}
});

require('./app/routes/')(app);

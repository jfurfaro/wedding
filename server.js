var path = require('path');
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var r = require('rethinkdb');
var _ = require('lodash');
var cons = require('consolidate');
var Handlebars = require('handlebars');
var compression = require('compression');

// Set up Handlebars for view templating, using path to ensure Express can find the views regardless of where the app gets launched from
app.set('views', path.resolve(__dirname + '/src'));
app.set('view engine', 'hbs');
app.engine('hbs', cons.handlebars);

// DB configuration
var dbConfig = {
		db: 'wedding', 
		host: process.env.DB_HOST || 'localhost', 
		port: process.env.DB_PORT || 28015
	};

// GZIP
app.use(compression());

// Short circuit static assets
app.use(express.static(__dirname + '/public'));

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.get('/', function(req, res){
	console.log(req.query);
	if(!req.query.admin) {
		res.status(200).render('index', {bride: 'Katie', groom: 'Joe'});
	} else {
		res.status(200).render('index', {admin: true});
	}
});

app.post('/bus', function(req, res){
	
	var passenger = {
			created: r.now(),
			name: req.body.passenger
		};

	r.connect(dbConfig)
		.then(function(conn){
			r.table('bus').insert(passenger).run(conn)
				.then(function(response){
					res.status(201).json({success: true, message: 'Passenger Added'});
				})
				.error(function(err){
					console.log(err);
					res.status(500).json({success: false, message: 'Something broke'});
				});
		})
		.error(function(err){
			console.log(err);
			res.status(500).json({success: false, message: 'Something bigger broke'});
		});
});

var server = app.listen(4000, function(){
	console.log('Wedding Time!');
});

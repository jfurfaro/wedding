var path = require('path');
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var r = require('rethinkdb');
var _ = require('lodash');
var cons = require('consolidate');
var Handlebars = require('handlebars');

// Set up Handlebars for view templating, using path to ensure Express can find the views regardless of where the app gets launched from
app.set('views', path.resolve(__dirname + '/src'));
app.set('view engine', 'hbs');
app.engine('hbs', cons.handlebars);

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.get('/', function(req, res){
	res.status(200).render('index', {bride: 'Katie', groom: 'Joe'});
});

app.post('/bus', function(req, res){
	var passengers = [];

	_.forEach(req.body.passengers, function(passenger){
		passengers.push({
			created: r.now(),
			name: passenger
		});
	});
		

	r.connect({db: 'wedding'})
		.then(function(conn){
			r.table('bus').insert(passengers).run(conn)
				.then(function(response){
					res.status(201).json({message: response.inserted + ' Passenger(s) Added'});
				})
				.error(function(err){
					console.log(err);
					res.status(500).json({message: 'Something broke'});
				});
		})
		.error(function(err){
			console.log(err);
			res.status(500).json({message: 'Something bigger broke'});
		});
});

var server = app.listen(4000, function(){
	console.log('Running!');
});

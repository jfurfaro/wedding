var express = require('express');
var app = express();
var path = require('path');
var r = require('rethinkdb');
var cons = require('consolidate');
var Handlebars = require('handlebars');

// Set up Handlebars for view templating, using path to ensure Express can find the views regardless of where the app gets launched from
app.set('views', path.resolve(__dirname + '/../src'));
app.set('view engine', 'hbs');
app.engine('hbs', cons.handlebars);

app.get('/', function(req, res){
	res.status(200).render('index', {bride: 'Katie', groom: 'Joe'});
});

var server = app.listen(4000, function(){
	console.log('Running!');
});

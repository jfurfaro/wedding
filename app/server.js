var express = require('express');
var app = express();
var r = require('rethinkdb');

app.get('/', function(req, res){
	res.status(200).send('We\'re getting married!');
});

var server = app.listen(4000, function(){
	console.log('Running!');
});


"use strict";

var express = require ("express");
var morgan = require('morgan');

var app = express ();

app.use(morgan('dev'));

app.use(express.static('public'));


var server = app.listen(3000, function () {
	// optional
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
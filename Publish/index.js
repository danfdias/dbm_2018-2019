var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var api = require('./Controllers/api.js');
var apiBackOffice = require('./Controllers/backOffice.js');
var apiFrontOffice = require('./Controllers/frontOffice.js');
var mustacheExpress = require('mustache-express');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache'); //extensão dos ficheiros das views
app.set('views', __dirname + '/Views'); //indicação de qual a pasta que irá conter as views

app.use('/api',api);
app.use('/',apiFrontOffice);
app.use('/backOffice', apiBackOffice);

var server = app.listen(8082,function () {
    var host = server.address().address === "::" ? "localhost" : server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});
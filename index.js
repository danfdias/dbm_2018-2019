var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require("fs");
var servidor = require("./Server/Server.js");
var mustache = require("mustache");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
});

app.post('/generate', function (req, res) {
    servidor.generateFolders();
});

var server = app.listen(8081, function () {
    var host = server.address().address === "::" ? "localhost" : server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});
var express = require("express");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
var api = require('./Controllers/api.js');
app.use('/api',api);

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/public/" + "index.html");
});

var server = app.listen(8082,function () {
    var host = server.address().address === "::" ? "localhost" : server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});
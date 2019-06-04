var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var api = require('./Controllers/api.js');
var apiBackOffice = require('./Controllers/backOffice.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api',api);
app.use('/backOffice', apiBackOffice);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
});

var server = app.listen(8082,function () {
    var host = server.address().address === "::" ? "localhost" : server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});
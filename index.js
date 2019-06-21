var express = require("express");
var app = express();
var servidor = require("./Server/Server.js");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
});

app.post('/generate', function (req, res) {
    servidor.generateFolders();
    res.redirect('http://localhost:8082/');
});

var server = app.listen(8081, function () {
    var host = server.address().address === "::" ? "localhost" : server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});
var fs = require('fs');
var mkdirp = require('mkdirp');
var del = require('del');
var classGenerator = require('./Models/generate-class.js');
var dbGenerator = require('./database/generate-database.js');
var genController = require('./Controllers/generate-controller.js');
var genBackOffice = require('./BackOffice/generate-backoffice.js');
var path = require('path');
var mustache = require('mustache');
var child_process = require('child_process');

function generateFolders() {
    // Remover todas as pastas e ficheiros presentes na pasta Publish
    del.sync(['Publish/**', '!Publish']);
    console.log('\nDeleted files and folders \n');
    // Criar pasta Controllers
    createDirectory('./Publish/Controllers');
    //Criar pasta Models
    createDirectory('./Publish/Models');
    // Criar pasta Public + Public/Css + Public/Images + Public/Js
    createChainDirectory('./Publish/Public/Css');
    createDirectory('./Publish/Public/Images');
    createDirectory('./Publish/Public/Js');
    // Criar pasta Views
    createDirectory('./Publish/Views');
    // Criar pasta Database
    createDirectory('./Publish/Database');
    console.log('Folders have been created \n');
    createFile('./Publish/Public', "index.html", 
    "<!DOCTYPE html> \n<html lang='en'>\n<head> " + 
    "<meta charset='UTF-8'> \n<link rel='stylesheet' type='text/css' href='css/default.css'>\n" +
    "<title>Projeto DBM</title> \n</head> \n<body> \n<h1>Servidor Gerado!</h1> \n</body> \n</html>");

    // Gerar classes    
    // Ler ficheiro 'config.json'
    var config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));
    classGenerator.createClasses(config);
    console.log('Models created \n');

    // Criar DB
    config.schemas.forEach(function (schema) {
        const classSchema = JSON.parse(fs.readFileSync(schema['path']));
        dbGenerator.generate(config.dbname, classSchema);
    });
    console.log('DB created \n');

    //Escrever copia do ficheiro sqlite
    var str = fs.readFileSync('./Server/server.mustache');
    var view = fs.readFileSync("./Server/config.json");
    for (var i = 0; i < config.staticFiles.length; i++) {
        var file = fs.readFileSync(config.staticFiles[i].originalPath);
        fs.writeFile(config.staticFiles[i].destinationPath, file, function (err) {
            if (err)
                console.log(err);
        });
    }

    //Publicar index.js do novo servidor
    var output = mustache.render(str.toString(), JSON.parse(view));
    //console.log("\n" + output + "\n");
    fs.writeFile('./Publish/index.js', output, function (err) {
        if (err)
            console.log(err);
    });

    //Criar roteamento RestulAPI do novo servidor
    var controller = "var express = require('express');\nvar router = express.Router();\n\n" +
    "/**\n" +
    "* Método que faz o mapeamento entre um objeto retornado pelo módulo sqlite num objeto de uma classe criada\n" +
    "* @param {any} object Representa o objeto retornado pela query à abse de dados\n" +
    "* @param {any} type Representa o tipo de objeto que se pretende converter\n" +
    "* @returns Devolve um objeto do tipo 'type' com o conteúdo que está no objeto 'object'\n" +
    "*/\n" +
    "function mapping(object, type) {\n" +
    "   var obj = new type();\n" +
    "   Object.keys(object).forEach(function (value) {\n" +
    "        //Se o objeto possuir o atributo que se está a verificar então recebe o valor retornado da query da base de dados\n" +
    "        if (obj.hasOwnProperty(value)){\n" +
    "           obj[value] = object[value];\n" +
    "        }\n" +
    "   });\n" +
    "   return obj;\n" +
    "}\n";
    config.schemas.forEach(function (schema) {
        const classSchema = JSON.parse(fs.readFileSync(schema['path']));
        controller += "\n" + genController.generateController(classSchema);
    });
    controller += '\n\nmodule.exports = router;';
    fs.writeFile('./Publish/Controllers/api.js', controller, function (err) {
        if (err) throw err;
        console.log('Controllers Published!\n');
    });

    //Gerar BackOffice
    var controllerBackOffice = "var express = require('express');\nvar router = express.Router();";
    config.schemas.forEach(function (schema) {
        const classSchema = JSON.parse(fs.readFileSync(schema['path']));
        controllerBackOffice += genBackOffice.generateBackOffice(classSchema);
    });    
    controllerBackOffice += '\n\nmodule.exports = router;';
    fs.writeFile('./Publish/Controllers/backOffice.js', controllerBackOffice, function (err) {
        if (err) throw err;
        console.log('BackOffice Published!\n');        
    });
    

    // Executar server.js
    child_process.fork('./Publish/index.js');
}

function createChainDirectory(paths) {
    mkdirp.sync(paths);
}

function createDirectory(path) {
    fs.mkdirSync(path);
}

function createFile(path, fileName, content){
    fs.writeFile(path + "/" + fileName, content, function (err) {
        if (err) throw err;
        console.log('File Created!\n');
    });
}

module.exports.generateFolders = generateFolders;
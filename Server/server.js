var fs = require('fs');
var mkdirp = require('mkdirp');
var del = require('del');
var classGenerator = require('./Models/generate-class.js');
var dbGenerator = require('./database/generate-database.js');
var genController = require('./Controller/generate-controller.js');
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

    // Gerar classes    
    // Ler ficheiro 'config.json'
    var config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));
    classGenerator.createClasses(config.schemas);
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
    console.log("\n" + output + "\n");
    fs.writeFile('./Publish/index.js', output, function (err) {
        if (err)
            console.log(err);
    });

    //Criar roteamento RestulAPI do novo servidor
    var controller = "var express = require('express');\nvar router = express.Router();";
    config.schemas.forEach(function (schema) {
        const classSchema = JSON.parse(fs.readFileSync(schema['path']));
        controller += "\n" + genController.generateController(classSchema);
    });
    controller += 'module.exports = router;';
    fs.writeFile('./Publish/Controllers/api.js', controller, function (err) {
        if (err) throw err;
        console.log('Controllers Published!\n');
    });
}

function createChainDirectory(paths) {
    mkdirp.sync(paths);
}

function createDirectory(path) {
    fs.mkdirSync(path);
}

module.exports.generateFolders = generateFolders;
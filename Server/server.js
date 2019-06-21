var fs = require('fs');
var mkdirp = require('mkdirp');
var del = require('del');
var classGenerator = require('./Models/generate-class.js');
var dbGenerator = require('./database/generate-database.js');
var genController = require('./Controllers/generate-controller.js');
var genBackOffice = require('./BackOffice/generate-backoffice.js');
var genFrontOffice = require('./FrontOffice/generate-frontoffice.js');
var path = require('path');
var mustache = require('mustache');
var child_process = require('child_process');
var ncp = require("ncp").ncp;

function generateFolders() {
    // Remover todas as pastas e ficheiros presentes na pasta Publish
    del.sync(['Publish/**', '!Publish']);
    console.log('\nDeleted files and folders \n');
    // Criar pasta Controllers
    createDirectory('./Publish/Controllers');
    //Criar pasta Models
    createDirectory('./Publish/Models');
    // Criar pasta Public + Public/Css + Public/Images + Public/Js + Public/webfonts
    createChainDirectory('./Publish/Public/Css');
    createDirectory('./Publish/Public/Images');
    createDirectory('./Publish/Public/Js');
    createDirectory('./Publish/Public/webfonts');
    // Criar pasta Populate + Images/Actors + Images/Movies + Images/Directors
    createChainDirectory('./Publish/Populate');
    createDirectory('./Publish/Public/Images/Actors');
    createDirectory('./Publish/Public/Images/Movies');
    createDirectory('./Publish/Public/Images/Directors');
    // Criar pasta Views
    createDirectory('./Publish/Views');
    // Criar pasta Database
    createDirectory('./Publish/Database');
    console.log('Folders have been created \n');
    
    // Gerar classes    
    // Ler ficheiro 'config.json'
    var config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));
    classGenerator.createClasses(config);
    console.log('Models created \n');

    config.schemas.forEach(function (schema) {
        const classSchema = fs.readFileSync(schema['path']);     
        var sch = JSON.parse(classSchema);
        fs.writeFile('./Publish/Models/' + sch.title + '-schema.js', "module.exports = " + classSchema, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });
    
    //Escrever ficheiros na publicacao
    var view = fs.readFileSync("./Server/config.json");
    for (var i = 0; i < config.staticFiles.length; i++) {
        var file = fs.readFileSync(config.staticFiles[i].originalPath);
        console.log(file);
        fs.writeFile(config.staticFiles[i].destinationPath, file, function (err) {
            if (err)
                console.log(err);
        });
    }

    // Criar DB
    config.schemas.forEach(function (schema) {
        const classSchema = JSON.parse(fs.readFileSync(schema['path']));
        dbGenerator.generate(config.dbname, classSchema);
    });
    console.log('DB created \n');
    //Copiar imagens DB    
    ncp("Server/Populate/Actors/", "Publish/Public/Images/Actors");
    ncp("Server/Populate/Directors/", "Publish/Public/Images/Directors");
    ncp("Server/Populate/Movies/", "Publish/Public/Images/Movies");   
    ncp("Server/CssStyles/webfonts/","Publish/Public/webfonts") ;

    //Publicar index.js do novo servidor    
    var str = fs.readFileSync('./Server/server.mustache');
    var output = mustache.render(str.toString(), JSON.parse(view));
    fs.writeFile('./Publish/index.js', output, function (err) {
        if (err)
            console.log(err);
    });

    //Criar roteamento RestulAPI do novo servidor
    var controller = genController.generateController(config.schemas);
    fs.writeFile('./Publish/Controllers/api.js', controller, function (err) {
        if (err) throw err;
        console.log('Controllers Published!\n');
    });

    //Gerar BackOffice
    var controllerBackOffice = genBackOffice.generateBackOffice(config.schemas);
    fs.writeFile('./Publish/Controllers/backOffice.js', controllerBackOffice, function (err) {
        if (err) throw err;
        console.log('BackOffice Published!\n');
    });
    //Gerar FrontOffice
    var controllerFrontOffice = genFrontOffice.generateFrontOffice(config);
    fs.writeFile('./Publish/Controllers/frontOffice.js', controllerFrontOffice, function (err) {
        if (err) throw err;
        console.log('FrontOffice Published!\n');
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

function createFile(path, fileName, content) {
    fs.writeFile(path + "/" + fileName, content, function (err) {
        if (err) throw err;
        console.log('File Created!\n');
    });
}

module.exports.generateFolders = generateFolders;
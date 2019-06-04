/**
 * Require dos modulos necessários para correr o ficheiro
 */
var fs = require('fs');
var mustache = require('mustache');
var path = require('path');
var template = fs.readFileSync(path.join(__dirname, 'controller.mustache'));

/**
 * Funcao que gera o controller para um determinado schema
 * @param {any} schema Representa o schema recebido para ser gerado o controller
 */
module.exports.generateController = function(schema) {
    var view = {
        controllerTitle: schema.title
    };

    var output = mustache.render(template.toString(), view);
    return output;
}
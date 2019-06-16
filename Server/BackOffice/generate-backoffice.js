/**
 * Require dos modulos necessários para correr o ficheiro
 */
var fs = require('fs');
var mustache = require('mustache');
var path = require('path');
var template = fs.readFileSync(path.join(__dirname, 'backoffice.mustache'));

/**
 * Funcao que gera o BackOffice para um determinado schema
 * @param {any} schema Representa o schema recebido para ser gerado o controller
 */
module.exports.generateBackOffice = function (schemas) {
    var controllers = new Array();
    schemas.forEach(function (schema) {
        const classSchema = JSON.parse(fs.readFileSync(schema['path']));
        controllers.push(
            {
                'controllerTitle': classSchema.title,
                'controllerTitleLower': classSchema.title.toLowerCase()
            }
        );
    });
    var view = {
        controllers: controllers
    };
    return mustache.render(template.toString(), view);
}
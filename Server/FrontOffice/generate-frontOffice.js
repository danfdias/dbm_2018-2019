var fs = require('fs');
var mustache = require('mustache');
var template = fs.readFileSync("./Server/frontOffice.mustache");

/**
 * Este gerador faz render do template frontoffice.mustache que irá ter como resultado uma pagina html 
 * com a informação devolvida pela função top da correspondente classe
 *
 * @param {*} config Objeto que contem todas as informações do config json
 */
module.exports.generateFrontOffice = function(config) {
    var controllers = [];
    var str;
    config.frontOffice.forEach(function(p) {
        var model = p["model"];
        var property = p["property"];
        var order = p["order"];
        var limit = p["limit"];
        str = {
            controllerTitle: model,
            controllerProperty: property,
            controllerOrder: order,
            controllerLimit: limit
        }
        controllers.push(str);
    });

    var view = {
        controllers: controllers
    };
    return mustache.render(template.toString(), view);
}
var fs = require('fs');
var mustache = require('mustache');
var path = require('path');
var template = fs.readFileSync(path.join(__dirname, 'frontOffice.mustache'));

/**
 * Este gerador faz render do template frontoffice.mustache que irá ter como resultado uma pagina html 
 * com a informação devolvida pela função top da correspondente classe
 *
 * @param {*} config Objeto que contem todas as informações do config json
 */
module.exports.generateFrontOffice = function(config) {
    var controllers = [];
    var controllersFrontOffice = [];
    var str;
    config.schemas.forEach(function(element, index, array) {
        controller = {
            controllerTitle: element.name,
            controllerTitleLower: element.name.toLowerCase()
        }
        if (index != array.length - 1){ 
            controller.comma = true;
        }        
        controllers.push(controller);  
    });

    config.frontOffice.forEach(function(element) {
        var model = element["model"];
        var property = element["property"];
        var order = element["order"];
        var limit = element["limit"];
        frontOficce = {
            controllerTitle: element.model,
            controllerTitleLower: element.model.toLowerCase(),
            controllerModel: model,
            controllerProperty: property,
            controllerOrder: order,
            controllerLimit: limit
        }     
        controllersFrontOffice.push(frontOficce);  
    });

    var view = {
        controllers: controllers,
        controllersFrontOffice: controllersFrontOffice
    };
    return mustache.render(template.toString(), view);
    /*
    config.frontOffice.forEach( array) {
        

              
    });
    */
}
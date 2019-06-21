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
    config.schemas.forEach(function(element, index, array) {
        controller = {
            controllerTitle: element.name,
            controllerTitleLower: element.name.toLowerCase(),
            controllerIcon: element.icon
        }
        if (index != array.length - 1){ 
            controller.comma = true;
        }        
        controllers.push(controller);  
    });

    config.frontOffice.forEach(function(element) {
        frontOficce = {
            controllerTitle: element.model,
            controllerTitleLower: element.model.toLowerCase(),
            controllerModel: element.model,
            controllerProperty: element.property,
            controllerOrder: element.order,
            controllerLimit: element.limit,
            controllerComparison: element.title
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
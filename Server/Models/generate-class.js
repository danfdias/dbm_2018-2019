const mustache = require('mustache');
const fs = require('fs');

function createClasses(config) {
    config.schemas.forEach(schema => {
        const schemaName = schema['name'];
        const schemaPath = schema['path'];

        const classSchema = JSON.parse(fs.readFileSync(schemaPath));

        const className = classSchema['title'];
        const classProps = Object.keys(classSchema['properties']);

        const propDictionary = new Array();
        classProps.forEach(element => {
            propDictionary.push({ 'name': element });
        });

        var classRequiredProp = classSchema.required;

        const classNonRequiredProp = classProps.filter(element => !classRequiredProp.includes(element));

        var propDictionaryNonRequired = new Array();
        classNonRequiredProp.forEach(element => {
            propDictionaryNonRequired.push({ 'element' : element });
        })

        const idDictionary = {
            propIdName: 'id',
            columnIdName: className.toLowerCase() + "_id"
          }; 

        const view = {
            dbname: config['dbname'],
            classTitle: className,
            classTitleLower: className.toLowerCase(),
            classProperties: classProps.join(),
            classConstructor: propDictionary,
            classNonEnumerables: propDictionaryNonRequired,
            classIds: idDictionary,
            primaryKey: {
                name: "id",
                columnName: className.toLowerCase() + "_id"
            },
            conditions: function() { //funcao que devolve todos os argumentos do objeto com "this." antes
                var str3 = "";
                classProps.forEach((p, i) => {
                    str3 += "this." + p;
                    if (i < (classProps.length - 1)) str3 += ","

                });
                return str3;
            },
            columns: function() { //funcao que devolve as colunas todas da tabela do objeto correspondente
                var str4 = "";
                classProps.forEach((p, i) => {
                    str4 += p + "";
                    if (i < (classProps.length - 1)) str4 += ","
                });
                return str4;
            },
            values: function() { //funcao que devolve uma string de argumentos para as queries do script
                var str5 = "";
                classProps.forEach((p, i) => {
                    str5 += "?";
                    if (i < (classProps.length - 1)) str5 += ","
                });
                return str5;
            },
            updateProps: function(){
                var str6 = "";
                classProps.forEach((p, i) => {
                    str6 += p + " = " + "?";
                    if (i < (classProps.length - 1)) str6 += ", "
                });
                return str6;
            }    
        }
        
        config.frontOffice.forEach(function(element){
            if(element.model === view.classTitle){
                view.hasOrdered = true;
            }
        });

        fs.readFile('./Server/models/class.mustache', function (err, data) {
            const output = mustache.render(data.toString(), view);

            fs.writeFile('./Publish/Models/' + schemaName + '.js', output, function (err) {
                if (err) throw err;
            });
        });
    });
}

module.exports.createClasses = createClasses;
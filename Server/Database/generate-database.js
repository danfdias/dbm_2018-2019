/**
 * Require dos modulos necessários para correr o ficheiro
 */
var fs = require('fs');
var mustache = require('mustache');
var path = require('path');
var template = fs.readFileSync(path.join(__dirname, 'create-table.mustache'));
var sqlite3 = require('sqlite3').verbose();

/**
 * Funcao que gera a base de dados para um determinado schema
 * @param {any} schema Representa o schema recebido para ser gerada a tabela e respetivas relacoes
 * @param {any} name Representa o nome da base de dados a ser usada
 */
module.exports.generate = function (name, schema) {
    var personProps = Object.keys(schema.properties);
    var db = new sqlite3.Database('./Publish/Database/' + name);
    var newTable = "";
    var view = {
        tableName: schema.title,
        tableProperties: function () { // funcao que gera a tabela para o respetivo objeto
            var str = "\n";
            str += schema.title.toLowerCase() + "_id integer PRIMARY KEY, \n";
            personProps.forEach((p, i) => {
                var typeAUx = schema.properties[p].type;
                str += p;
                if (typeAUx === "integer") str += " " + typeAUx;
                if (typeAUx === "string") str += " " + "text NOT NULL"
                if (typeAUx === "number") str += " FLOAT";
                if (schema.properties[p].unique === true) str += " " + "UNIQUE";
                if (i < (personProps.length - 1)) str += ", \n"
            });

            if (schema.references) {
                var ref = schema.references;
                var fks = "";
                for (var i = 0; i < ref.length; i++) {
                    var model = ref[i]["model"];
                    var rel = ref[i]["relation"];
                    if (rel === "1-M" || rel === "1-1") {
                        str += ",\n" + model.toLowerCase() + "_id integer NOT NULL "
                        fks += ",\nFOREIGN KEY (" + model.toLowerCase() + "_id) REFERENCES " + model + "(" + model.toLowerCase() + "_id)";
                    }
                    if (rel === "M-M") {
                        newTable += "CREATE TABLE IF NOT EXISTS " + schema.title + "_" + model + "(\n";
                        newTable += schema.title.toLowerCase() + "_id integer not null,\n" + model.toLowerCase() + "_id integer not null,\n";
                        newTable += "FOREIGN KEY (" + schema.title.toLowerCase() + "_id) REFERENCES " + schema.title + "(" + schema.title.toLowerCase() + "_id),\n";
                        newTable += "FOREIGN KEY (" + model.toLowerCase() + "_id) REFERENCES " + model + "(" + model.toLowerCase() + "_id),\n";
                        newTable += "CONSTRAINT PK PRIMARY KEY (" + schema.title.toLowerCase() + "_id," + model.toLowerCase() + "_id)\n);";
                    }
                }
                str += fks;
            }
            return str;
        }
    };
    var output = mustache.render(template.toString(), view);

    db.serialize(function () {
        db.run(output);
        if (newTable.length > 0) {
            newTable.split(";").forEach(function (element) {
                if (element.length > 0) {
                    var tabela = element + ";";
                    db.run(tabela);
                }
            });
        }
    });

    //Ações a realizar à base de dados
    db.close(function (err) {
        if (err) return console.error(err.message);
    });
}
var database = require('../Database/sqlite.js')('./Publish/Database/projeto_dbm.db');

class Director {
    constructor (name,decription,awards) {
        this.id = undefined;
        this.name = name;
        this.decription = decription;
        this.awards = awards;
        
        Object.defineProperty(this, 'awards', { enumerable: false });
    }    
}

/**
* Funcao que cria um mapeamento entre o nome da propriedade de um objeto e a tabela da base de dados
*/
Director.mappingDBtoObject = {
  director_id: 'id',
  name: 'name',
  decription: 'decription',
  awards: 'awards',
};


Director.all = function (callback) {
    //fazer a chamada a  funcao all do database
    database.where('SELECT * FROM Director',[], Director, function(rows){
        callback(rows);
    });
}

/**
* Funcao get que faz o select de uma determinada coluna da tabela Director
*/
Director.get = function (id, callback) {
    //fazer a chamada a  funcao get do database
    database.where('SELECT * FROM Director WHERE director_id = ?',[id],Director,function(rows){
        callback(rows);
    });
}

/**
* Funcao save que faz o insert/update de uma coluna a tabela Director
*/
Director.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id serÃ¡ para update
        //fazer a chamada a  funcao run do database para atualizar o registo
        database.run('UPDATE Director SET name = ?, decription = ?, awards = ? WHERE director_id = ?',[this.name,this.decription,this.awards,this.id],function(rows){
            callback(rows);
        });
    } else { //caso contrÃ¡rio para insert
        //fazer a chamada a  funcao run do database para inserir o registo
        database.run('INSERT INTO Director (name,decription,awards) VALUES (?,?,?)',[this.name,this.decription,this.awards],function(rows){
            callback(rows);
        });
    }
}

/**
* Funcao save que faz o delete de uma coluna a tabela Director
*/
Director.delete = function (id, callback) {
    //fazer a chamada a  funcao run do database para apagar um registo na base de dados
    database.run('DELETE * FROM Director WHERE director_id = ?',[id],Director,function(rows){
        callback(rows);
    });
} 

module.exports = Director;
var database = require('../Database/sqlite.js')('./Publish/Database/projeto_dbm.db');

class Category {
    constructor (type) {
        this.id = undefined;
        this.type = type;
        
    }    
}

/**
* Funcao que cria um mapeamento entre o nome da propriedade de um objeto e a tabela da base de dados
*/
Category.mappingDBtoObject = {
  category_id: 'id',
  type: 'type',
};


Category.all = function (callback) {
    //fazer a chamada a  funcao all do database
    database.where('SELECT * FROM Category',[], Category, function(rows){
        callback(rows);
    });
}

/**
* Funcao get que faz o select de uma determinada coluna da tabela Category
*/
Category.get = function (id, callback) {
    //fazer a chamada a  funcao get do database
    database.where('SELECT * FROM Category WHERE category_id = ?',[id],Category,function(rows){
        callback(rows);
    });
}

/**
* Funcao save que faz o insert/update de uma coluna a tabela Category
*/
Category.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id serÃ¡ para update
        //fazer a chamada a  funcao run do database para atualizar o registo
        database.run('UPDATE Category SET type = ? WHERE category_id = ?',[this.type,this.id],function(rows){
            callback(rows);
        });
    } else { //caso contrÃ¡rio para insert
        //fazer a chamada a  funcao run do database para inserir o registo
        database.run('INSERT INTO Category (type) VALUES (?)',[this.type],function(rows){
            callback(rows);
        });
    }
}

/**
* Funcao save que faz o delete de uma coluna a tabela Category
*/
Category.delete = function (id, callback) {
    //fazer a chamada a  funcao run do database para apagar um registo na base de dados
    database.run('DELETE * FROM Category WHERE category_id = ?',[id],Category,function(rows){
        callback(rows);
    });
} 


module.exports = Category;
var database = require('../Database/sqlite.js')('./Publish/Database/projeto_dbm.db');

class Room {
    constructor (number) {
        this.id = undefined;
        this.number = number;
        
    }    
}

/**
* Funcao que cria um mapeamento entre o nome da propriedade de um objeto e a tabela da base de dados
*/
Room.mappingDBtoObject = {
  room_id: 'id',
  number: 'number',
};


Room.all = function (callback) {
    //fazer a chamada a  funcao all do database
    database.where('SELECT * FROM Room',[], Room, function(rows){
        callback(rows);
    });
}

/**
* Funcao get que faz o select de uma determinada coluna da tabela Room
*/
Room.get = function (id, callback) {
    //fazer a chamada a  funcao get do database
    database.where('SELECT * FROM Room WHERE room_id = ?',[id],Room,function(rows){
        callback(rows);
    });
}

/**
* Funcao save que faz o insert/update de uma coluna a tabela Room
*/
Room.prototype.save = function (callback) {    
    if(this.id != undefined) { //Se existir valor no id serÃ¡ para update
        //fazer a chamada a  funcao run do database para atualizar o registo
        database.run('UPDATE Room SET number = ? WHERE room_id = ?',[this.number,this.id],function(rows){
            callback(rows);
        });
    } else { //caso contrÃ¡rio para insert
        //fazer a chamada a  funcao run do database para inserir o registo
        database.run('INSERT INTO Room (number) VALUES (?)',[this.number],function(rows){
            callback(rows);
        });
    }
}

/**
* Funcao save que faz o delete de uma coluna a tabela Room
*/
Room.delete = function (id, callback) {
    //fazer a chamada a  funcao run do database para apagar um registo na base de dados
    database.run(`DELETE FROM Room WHERE room_id = ?`,[id],function(){
        callback();
    });
} 


module.exports = Room;
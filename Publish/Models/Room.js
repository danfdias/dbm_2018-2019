var database = require('../Database/sqlite.js')('../Database/projeto_dbm.db');

class Room {
    constructor (numero) {
        this.id = undefined;
        this.numero = numero;
        
    }    
}

/**
* Funcao que cria um mapeamento entre o nome da propriedade de um objeto e a tabela da base de dados
*/
Room.mappingDBtoObject = {
  room_id: 'id',
  numero: 'numero',
};


Room.all = function (callback) {
    //fazer a chamada a  funcao all do database
    database.all('SELECT * FROM Room',Room,callback);
}

/**
* Funcao get que faz o select de uma determinada coluna da tabela Room
*/
Room.get = function (id, callback) {
    //fazer a chamada a  funcao get do database
    database.get('SELECT * FROM Room WHERE room_id = ?',[id],Room,callback);
}

/**
* Funcao save que faz o insert/update de uma coluna a tabela Room
*/
Room.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id serÃ¡ para update
        //fazer a chamada a  funcao run do database para atualizar o registo
        database.run('UPDATE Room SET numero = ? WHERE room_id = ?',[this.numero,this.id],callback);
    } else { //caso contrÃ¡rio para insert
        //fazer a chamada a  funcao run do database para inserir o registo
        database.run('INSERT INTO Room (numero) VALUES (?)',[this.numero],callback);
    }
}

/**
* Funcao save que faz o delete de uma coluna a tabela Room
*/
Room.delete = function (id, callback) {
    //fazer a chamada a  funcao run do database para apagar um registo na base de dados
    database.run('DELETE * FROM Room WHERE room_id = ?',[id],Room,callback);
} 

module.exports = Room;
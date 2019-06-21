var database = require('../Database/sqlite.js')('./Publish/Database/projeto_dbm.db');

class Ticket {
    constructor (price) {
        this.id = undefined;
        this.price = price;
        
    }    
}

/**
* Funcao que cria um mapeamento entre o nome da propriedade de um objeto e a tabela da base de dados
*/
Ticket.mappingDBtoObject = {
  ticket_id: 'id',
  price: 'price',
};


Ticket.all = function (callback) {
    //fazer a chamada a  funcao all do database
    database.where('SELECT * FROM Ticket',[], Ticket, function(rows){
        callback(rows);
    });
}

/**
* Funcao get que faz o select de uma determinada coluna da tabela Ticket
*/
Ticket.get = function (id, callback) {
    //fazer a chamada a  funcao get do database
    database.where('SELECT * FROM Ticket WHERE ticket_id = ?',[id],Ticket,function(rows){
        callback(rows);
    });
}

/**
* Funcao save que faz o insert/update de uma coluna a tabela Ticket
*/
Ticket.prototype.save = function (callback) {    
    if(this.id != undefined) { //Se existir valor no id serÃ¡ para update
        //fazer a chamada a  funcao run do database para atualizar o registo
        database.run('UPDATE Ticket SET price = ? WHERE ticket_id = ?',[this.price,this.id],function(rows){
            callback(rows);
        });
    } else { //caso contrÃ¡rio para insert
        //fazer a chamada a  funcao run do database para inserir o registo
        database.run('INSERT INTO Ticket (price) VALUES (?)',[this.price],function(rows){
            callback(rows);
        });
    }
}

/**
* Funcao save que faz o delete de uma coluna a tabela Ticket
*/
Ticket.delete = function (id, callback) {
    //fazer a chamada a  funcao run do database para apagar um registo na base de dados
    database.run(`DELETE FROM Ticket WHERE ticket_id = ?`,[id],function(){
        callback();
    });
} 


module.exports = Ticket;
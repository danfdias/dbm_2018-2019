var database = require('../Database/sqlite.js')('../Database/projeto_dbm.db');

class Place {
    constructor (chair_number,row) {
        this.id = undefined;
        this.chair_number = chair_number;
        this.row = row;
        
    }    
}

/**
* Funcao que cria um mapeamento entre o nome da propriedade de um objeto e a tabela da base de dados
*/
Place.mappingDBtoObject = {
  place_id: 'id',
  chair_number: 'chair_number',
  row: 'row',
};


Place.all = function (callback) {
    //fazer a chamada a  funcao all do database
    database.all('SELECT * FROM Place',Place,callback);
}

/**
* Funcao get que faz o select de uma determinada coluna da tabela Place
*/
Place.get = function (id, callback) {
    //fazer a chamada a  funcao get do database
    database.get('SELECT * FROM Place WHERE place_id = ?',[id],Place,callback);
}

/**
* Funcao save que faz o insert/update de uma coluna a tabela Place
*/
Place.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id serÃ¡ para update
        //fazer a chamada a  funcao run do database para atualizar o registo
        database.run('UPDATE Place SET chair_number = ?, row = ? WHERE place_id = ?',[this.chair_number,this.row,this.id],callback);
    } else { //caso contrÃ¡rio para insert
        //fazer a chamada a  funcao run do database para inserir o registo
        database.run('INSERT INTO Place (chair_number,row) VALUES (?,?)',[this.chair_number,this.row],callback);
    }
}

/**
* Funcao save que faz o delete de uma coluna a tabela Place
*/
Place.delete = function (id, callback) {
    //fazer a chamada a  funcao run do database para apagar um registo na base de dados
    database.run('DELETE * FROM Place WHERE place_id = ?',[id],Place,callback);
} 

module.exports = Place;
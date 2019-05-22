var database = require('../Database/sqlite.js')('../Database/projeto_dbm.db');

class Actor {
    constructor (name,decription,awards,gender,height,weight,curiosities) {
        this.id = undefined;
        this.name = name;
        this.decription = decription;
        this.awards = awards;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.curiosities = curiosities;
        
        Object.defineProperty(this, 'awards', { enumerable: false });
    }    
}

/**
* Funcao que cria um mapeamento entre o nome da propriedade de um objeto e a tabela da base de dados
*/
Actor.mappingDBtoObject = {
  actor_id: 'id',
  name: 'name',
  decription: 'decription',
  awards: 'awards',
  gender: 'gender',
  height: 'height',
  weight: 'weight',
  curiosities: 'curiosities',
};


Actor.all = function (callback) {
    //fazer a chamada a  funcao all do database
    database.all('SELECT * FROM Actor',Actor,callback);
}

/**
* Funcao get que faz o select de uma determinada coluna da tabela Actor
*/
Actor.get = function (id, callback) {
    //fazer a chamada a  funcao get do database
    database.get('SELECT * FROM Actor WHERE actor_id = ?',[id],Actor,callback);
}

/**
* Funcao save que faz o insert/update de uma coluna a tabela Actor
*/
Actor.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id serÃ¡ para update
        //fazer a chamada a  funcao run do database para atualizar o registo
        database.run('UPDATE Actor SET name = ?, decription = ?, awards = ?, gender = ?, height = ?, weight = ?, curiosities = ? WHERE actor_id = ?',[this.name,this.decription,this.awards,this.gender,this.height,this.weight,this.curiosities,this.id],callback);
    } else { //caso contrÃ¡rio para insert
        //fazer a chamada a  funcao run do database para inserir o registo
        database.run('INSERT INTO Actor (name,decription,awards,gender,height,weight,curiosities) VALUES (?,?,?,?,?,?,?)',[this.name,this.decription,this.awards,this.gender,this.height,this.weight,this.curiosities],callback);
    }
}

/**
* Funcao save que faz o delete de uma coluna a tabela Actor
*/
Actor.delete = function (id, callback) {
    //fazer a chamada a  funcao run do database para apagar um registo na base de dados
    database.run('DELETE * FROM Actor WHERE actor_id = ?',[id],Actor,callback);
} 

module.exports = Actor;
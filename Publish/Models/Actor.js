var database = require('../Database/sqlite.js')('./Publish/Database/projeto_dbm.db');

class Actor {
    constructor (name,description,awards,gender,height,weight,curiosities,image) {
        this.id = undefined;
        this.name = name;
        this.description = description;
        this.awards = awards;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.curiosities = curiosities;
        this.image = image;
        
        Object.defineProperty(this, 'image', { enumerable: false });
    }    
}

/**
* Funcao que cria um mapeamento entre o nome da propriedade de um objeto e a tabela da base de dados
*/
Actor.mappingDBtoObject = {
  actor_id: 'id',
  name: 'name',
  description: 'description',
  awards: 'awards',
  gender: 'gender',
  height: 'height',
  weight: 'weight',
  curiosities: 'curiosities',
  image: 'image',
};


Actor.all = function (callback) {
    //fazer a chamada a  funcao all do database
    database.where('SELECT * FROM Actor',[], Actor, function(rows){
        callback(rows);
    });
}

/**
* Funcao get que faz o select de uma determinada coluna da tabela Actor
*/
Actor.get = function (id, callback) {
    //fazer a chamada a  funcao get do database
    database.where('SELECT * FROM Actor WHERE actor_id = ?',[id],Actor,function(rows){
        callback(rows);
    });
}

/**
* Funcao save que faz o insert/update de uma coluna a tabela Actor
*/
Actor.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id serÃ¡ para update
        //fazer a chamada a  funcao run do database para atualizar o registo
        database.run('UPDATE Actor SET name = ?, description = ?, awards = ?, gender = ?, height = ?, weight = ?, curiosities = ?, image = ? WHERE actor_id = ?',[this.name,this.description,this.awards,this.gender,this.height,this.weight,this.curiosities,this.image,this.id],function(rows){
            callback(rows);
        });
    } else { //caso contrÃ¡rio para insert
        //fazer a chamada a  funcao run do database para inserir o registo
        database.run('INSERT INTO Actor (name,description,awards,gender,height,weight,curiosities,image) VALUES (?,?,?,?,?,?,?,?)',[this.name,this.description,this.awards,this.gender,this.height,this.weight,this.curiosities,this.image],function(rows){
            callback(rows);
        });
    }
}

/**
* Funcao save que faz o delete de uma coluna a tabela Actor
*/
Actor.delete = function (id, callback) {
    //fazer a chamada a  funcao run do database para apagar um registo na base de dados
    database.run('DELETE * FROM Actor WHERE actor_id = ?',[id],Actor,function(rows){
        callback(rows);
    });
} 

/**
 * Função que executa uma query que devolve todas as entradas da tabela Actor ordenados por um determinado valor, 
 * com um determinado limite e ordenados de uma determinada maneira, estas 3 informações são recebidas no metodo
 *
 * @param {*} property Nome da propriedade com que as entradas vao ser ordenadas
 * @param {*} order Tipo de ordenação da informação devolvida (Decrescente ou Ascedente)
 * @param {*} limit Numero máximo de entradas a serem devolvidas pela query
 * @callback função callback que vai ser chamada para processar a informação recebida da base de dados
 */
Actor.top = function (property, order, limit, callback){
    database.where(`SELECT * FROM Actor ORDER BY ${property} ${order} LIMIT ${limit}`, [], Actor, function(rows){
        callback(rows);
    });
}

module.exports = Actor;
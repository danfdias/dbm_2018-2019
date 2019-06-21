var database = require('../Database/sqlite.js')('./Publish/Database/projeto_dbm.db');

class Director {
    constructor (name,description,gender,awards,image) {
        this.id = undefined;
        this.name = name;
        this.description = description;
        this.gender = gender;
        this.awards = awards;
        this.image = image;
        
        Object.defineProperty(this, 'image', { enumerable: false });
    }    
}

/**
* Funcao que cria um mapeamento entre o nome da propriedade de um objeto e a tabela da base de dados
*/
Director.mappingDBtoObject = {
  director_id: 'id',
  name: 'name',
  description: 'description',
  gender: 'gender',
  awards: 'awards',
  image: 'image',
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
        database.run('UPDATE Director SET name = ?, description = ?, gender = ?, awards = ?, image = ? WHERE director_id = ?',[this.name,this.description,this.gender,this.awards,this.image,this.id],function(rows){
            callback(rows);
        });
    } else { //caso contrÃ¡rio para insert
        //fazer a chamada a  funcao run do database para inserir o registo
        database.run('INSERT INTO Director (name,description,gender,awards,image) VALUES (?,?,?,?,?)',[this.name,this.description,this.gender,this.awards,this.image],function(rows){
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

/**
 * Função que executa uma query que devolve todas as entradas da tabela Director ordenados por um determinado valor, 
 * com um determinado limite e ordenados de uma determinada maneira, estas 3 informações são recebidas no metodo
 *
 * @param {*} property Nome da propriedade com que as entradas vao ser ordenadas
 * @param {*} order Tipo de ordenação da informação devolvida (Decrescente ou Ascedente)
 * @param {*} limit Numero máximo de entradas a serem devolvidas pela query
 * @callback função callback que vai ser chamada para processar a informação recebida da base de dados
 */
Director.top = function (property, order, limit, callback){
    database.where(`SELECT * FROM Director ORDER BY ${property} ${order} LIMIT ${limit}`, [], Director, function(rows){
        callback(rows);
    });
}

module.exports = Director;
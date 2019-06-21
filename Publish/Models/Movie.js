var database = require('../Database/sqlite.js')('./Publish/Database/projeto_dbm.db');

class Movie {
    constructor (title,synopsis,imdb_pontuation,awards,language,budget,duration,age_restriction,image) {
        this.id = undefined;
        this.title = title;
        this.synopsis = synopsis;
        this.imdb_pontuation = imdb_pontuation;
        this.awards = awards;
        this.language = language;
        this.budget = budget;
        this.duration = duration;
        this.age_restriction = age_restriction;
        this.image = image;
        
        Object.defineProperty(this, 'image', { enumerable: false });
    }    
}

/**
* Funcao que cria um mapeamento entre o nome da propriedade de um objeto e a tabela da base de dados
*/
Movie.mappingDBtoObject = {
  movie_id: 'id',
  title: 'title',
  synopsis: 'synopsis',
  imdb_pontuation: 'imdb_pontuation',
  awards: 'awards',
  language: 'language',
  budget: 'budget',
  duration: 'duration',
  age_restriction: 'age_restriction',
  image: 'image',
};


Movie.all = function (callback) {
    //fazer a chamada a  funcao all do database
    database.where('SELECT * FROM Movie',[], Movie, function(rows){
        callback(rows);
    });
}

/**
* Funcao get que faz o select de uma determinada coluna da tabela Movie
*/
Movie.get = function (id, callback) {
    //fazer a chamada a  funcao get do database
    database.where('SELECT * FROM Movie WHERE movie_id = ?',[id],Movie,function(rows){
        callback(rows);
    });
}

/**
* Funcao save que faz o insert/update de uma coluna a tabela Movie
*/
Movie.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id serÃ¡ para update
        //fazer a chamada a  funcao run do database para atualizar o registo
        database.run('UPDATE Movie SET title = ?, synopsis = ?, imdb_pontuation = ?, awards = ?, language = ?, budget = ?, duration = ?, age_restriction = ?, image = ? WHERE movie_id = ?',[this.title,this.synopsis,this.imdb_pontuation,this.awards,this.language,this.budget,this.duration,this.age_restriction,this.image,this.id],function(rows){
            callback(rows);
        });
    } else { //caso contrÃ¡rio para insert
        //fazer a chamada a  funcao run do database para inserir o registo
        database.run('INSERT INTO Movie (title,synopsis,imdb_pontuation,awards,language,budget,duration,age_restriction,image) VALUES (?,?,?,?,?,?,?,?,?)',[this.title,this.synopsis,this.imdb_pontuation,this.awards,this.language,this.budget,this.duration,this.age_restriction,this.image],function(rows){
            callback(rows);
        });
    }
}

/**
* Funcao save que faz o delete de uma coluna a tabela Movie
*/
Movie.delete = function (id, callback) {
    //fazer a chamada a  funcao run do database para apagar um registo na base de dados
    database.run('DELETE * FROM Movie WHERE movie_id = ?',[id],Movie,function(rows){
        callback(rows);
    });
} 

/**
 * Função que executa uma query que devolve todas as entradas da tabela Movie ordenados por um determinado valor, 
 * com um determinado limite e ordenados de uma determinada maneira, estas 3 informações são recebidas no metodo
 *
 * @param {*} property Nome da propriedade com que as entradas vao ser ordenadas
 * @param {*} order Tipo de ordenação da informação devolvida (Decrescente ou Ascedente)
 * @param {*} limit Numero máximo de entradas a serem devolvidas pela query
 * @callback função callback que vai ser chamada para processar a informação recebida da base de dados
 */
Movie.top = function (property, order, limit, callback){
    database.where(`SELECT * FROM Movie ORDER BY ${property} ${order} LIMIT ${limit}`, [], Movie, function(rows){
        callback(rows);
    });
}

module.exports = Movie;
var database = require('../Database/sqlite.js')('../Database/projeto_dbm.db');

class Movie {
    constructor (title,synopsis,imdb_pontuation,awards,language,budget,duration,age_restriction) {
        this.id = undefined;
        this.title = title;
        this.synopsis = synopsis;
        this.imdb_pontuation = imdb_pontuation;
        this.awards = awards;
        this.language = language;
        this.budget = budget;
        this.duration = duration;
        this.age_restriction = age_restriction;
        
        Object.defineProperty(this, 'awards', { enumerable: false });
        Object.defineProperty(this, 'budget', { enumerable: false });
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
};


Movie.all = function (callback) {
    //fazer a chamada a  funcao all do database
    database.all('SELECT * FROM Movie',Movie,callback);
}

/**
* Funcao get que faz o select de uma determinada coluna da tabela Movie
*/
Movie.get = function (id, callback) {
    //fazer a chamada a  funcao get do database
    database.get('SELECT * FROM Movie WHERE movie_id = ?',[id],Movie,callback);
}

/**
* Funcao save que faz o insert/update de uma coluna a tabela Movie
*/
Movie.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id serÃ¡ para update
        //fazer a chamada a  funcao run do database para atualizar o registo
        database.run('UPDATE Movie SET title = ?, synopsis = ?, imdb_pontuation = ?, awards = ?, language = ?, budget = ?, duration = ?, age_restriction = ? WHERE movie_id = ?',[this.title,this.synopsis,this.imdb_pontuation,this.awards,this.language,this.budget,this.duration,this.age_restriction,this.id],callback);
    } else { //caso contrÃ¡rio para insert
        //fazer a chamada a  funcao run do database para inserir o registo
        database.run('INSERT INTO Movie (title,synopsis,imdb_pontuation,awards,language,budget,duration,age_restriction) VALUES (?,?,?,?,?,?,?,?)',[this.title,this.synopsis,this.imdb_pontuation,this.awards,this.language,this.budget,this.duration,this.age_restriction],callback);
    }
}

/**
* Funcao save que faz o delete de uma coluna a tabela Movie
*/
Movie.delete = function (id, callback) {
    //fazer a chamada a  funcao run do database para apagar um registo na base de dados
    database.run('DELETE * FROM Movie WHERE movie_id = ?',[id],Movie,callback);
} 

module.exports = Movie;
var database = require('../Database/sqlite.js')('./Publish/Database/projeto_dbm.db');

/**
 * Metodo que insere um Ator na base de dados com base nas informaçoes recebidas
 * @param {*} name Nome do ator
 * @param {*} description Descricao sobre o ator
 * @param {*} awards Nummero de premios que o ator têm
 * @param {*} gender Genero do ator
 * @param {*} height Altura do ator
 * @param {*} weight Peso do ator
 * @param {*} curiosities Curiosidades a cerca do ator
 * @param {*} image Imagem perfil do ator
 */
function insertActor(name, description, awards, gender, height, weight, curiosities, image){
    database.run('INSERT INTO Actor (name, description, awards, gender, height, weight, curiosities, image) VALUES (?,?,?,?,?,?,?,?)', 
    [name, description, awards, gender, height, weight, curiosities, image]);    
}

/**
 * Metodo que insere uma Categoria na base de dados com base nas informaçoes recebidas
 * @param {*} type Tipo da categoria
 */
function insertCategory(type){
    database.run('INSERT INTO Category (type) VALUES (?)', [type]);    
}

/**
 * Metodo que insere um Diretor na base de dados com base nas informaçoes recebidas
 * @param {*} name Nome do diretor
 * @param {*} description Descricao sobre o diretor
 * @param {*} gender Genero do diretor
 * @param {*} awards Numero de premios do diretor
 * @param {*} image Imagem de pefil do diretor
 */
function insertDirector(name, description, gender, awards, image){
    database.run('INSERT INTO Director (name, description, gender, awards, image) VALUES (?,?,?,?,?)', 
    [name, description, gender, awards, image]);    
}

/**
 * Metodo que insere um Filme na base de dados com base nas informaçoes recebidas
 * @param {*} name Nome do filme
 * @param {*} synopsis Sinopse sobre o filme
 * @param {*} imdb_pontuation Pontuacao geral do filme
 * @param {*} awards Numero de premios do filme 
 * @param {*} language Linguagem do filme
 * @param {*} budget Valor gasto na produção do filme
 * @param {*} duration Duraçao do filme
 * @param {*} age_restriction Idade minima para assistir ao filme
 * @param {*} image Imagem perfil do filme
 */
function insertMovie(name, synopsis, imdb_pontuation, awards, language, budget, duration, age_restriction, image){
    database.run('INSERT INTO Movie (name, synopsis, imdb_pontuation, awards, language, budget, duration, age_restriction, image) VALUES (?,?,?,?,?,?,?,?,?)', 
    [name, synopsis, imdb_pontuation, awards, language, budget, duration, age_restriction, image]);    
}

/**
 * Metodo que insere um Lugar de uma sala na base de dados com base nas informaçoes recebidas
 * @param {*} chair_number Numero da cadeira
 * @param {*} row Fila correspondente ao lugar
 * @param {*} room Sala correspondente ao lugar
 */
function insertPlace(chair_number, row, room){
    database.run('INSERT INTO Place (chair_number, row, room_id) VALUES (?,?,?)', [chair_number, row, room]);    
}

/**
 * Metodo que insere uma sala na base de dados com base nas informaçoes recebidas
 * @param {*} number Numero da sala
 */
function insertRoom(number){    
    console.log("Inserindo room: " + number);
    database.run('INSERT INTO Room (number) VALUES (?)', [number]);    
}

/**
 * Metodo que popula a base de dados com dados predefinidos
 */
module.exports.execPopulate = function (){
    var numeroSalas = 1;
    var numeroLugaresMax = 25;
    var numeroFilasMax = 20;
    //Inserir Salas de Cinema
    for (let i = 0; i < numeroSalas; i++) {
        insertRoom(i + 1);        
    }
    //Inserir 20 filas com 25lugares cada em todas as salas
    for (let a = 0; a < numeroSalas; a++) {
        for (let b = 0; b < numeroFilasMax; b++) {
            for (let c = 0; c < numeroLugaresMax; c++) {
                insertPlace(c+1, b+1, a+1);             
            }            
        }
    }
    //Inserir Categorias
    insertCategory("Animação");
    insertCategory("Desporto");
    insertCategory("Ação");    
    insertCategory("Terror");
    insertCategory("Aventura");
    insertCategory("Ficção Cientifica");
    insertCategory("Comédia");
    insertCategory("Crime");
    insertCategory("Policial");
    insertCategory("Fantasia");
    //Inserir Atores
    insertActor("Angelina Jolie", "Sem Descrição", 20, "Feminino", 165, 50, "Sem Curiosidades", "Images/Actors/angelinajolie.jpg");
    insertActor("Brad Pitt", "Sem Descrição", 11, "Masculino", 172, 75, "Sem Curiosidades", "Images/Actors/bradpitt.jpg");
    insertActor("Christian Bale", "Sem Descrição", 3, "Masculino", 175, 82, "Sem Curiosidades", "Images/Actors/christianbale.jpg");
    insertActor("Emma Watson", "Sem Descrição", 4, "Feminino", 165, 52, "Sem Curiosidades", "Images/Actors/emmawatson.jpg");
    insertActor("Gal Gadot", "Sem Descrição", 18, "Feminino", 167, 56, "Sem Curiosidades", "Images/Actors/galgadot.jpg");
    insertActor("Jennifer Lawrence", "Sem Descrição", 7, "Feminino", 157, 51, "Sem Curiosidades", "Images/Actors/jenniferlawrence.jpg");
    insertActor("Leonardo DiCaprio", "Sem Descrição", 15, "Masculino", 186, 80, "Sem Curiosidades", "Images/Actors/leonardodicaprio.jpg");
    insertActor("Liam Neeson", "Sem Descrição", 4, "Masculino", 182, 85, "Sem Curiosidades", "Images/Actors/liamneeson.jpg");
    insertActor("Margot Robbie", "Sem Descrição", 11, "Feminino", 165, 53, "Sem Curiosidades", "Images/Actors/margotrobbie.jpg");
    insertActor("Mark Ruffalo", "Sem Descrição", 10, "Masculino", 175, 87, "Sem Curiosidades", "Images/Actors/markruffalo.jpg");
    insertActor("Matt Damon", "Sem Descrição", 16, "Masculino", 172, 80, "Sem Curiosidades", "Images/Actors/mattdamon.jpg");
    insertActor("Morgan Freeman", "Sem Descrição", 26, "Masculino", 167, 89, "Sem Curiosidades", "Images/Actors/morganfreeman.jpg");
    insertActor("Natalie Portman", "Sem Descrição", 13, "Feminino", 165, 57, "Sem Curiosidades", "Images/Actors/natalieportman.jpg");
    insertActor("Robert De Niro", "Sem Descrição", 22, "Masculino", 172, 78, "Sem Curiosidades", "Images/Actors/robertdeniro.jpg");
    insertActor("Samuel L Jackson", "Sem Descrição", 35, "Masculino", 178, 86, "Sem Curiosidades", "Images/Actors/samuelljackson.jpg");
    insertActor("Scarlett Johansson", "Sem Descrição", 10, "Feminino", 169, 55, "Sem Curiosidades", "Images/Actors/scarlettjohansson.jpg");
    insertActor("Tom Cruise", "Sem Descrição", 40, "Masculino", 175, 86, "Sem Curiosidades", "Images/Actors/tomcruise.jpg");
    insertActor("Tom Hanks", "Sem Descrição", 7, "Masculino", 172, 81, "Sem Curiosidades", "Images/Actors/tomhanks.jpg");
    //Inserir Diretores
    insertDirector("Quentin Tarantino", "Sem Descrição", "Masculino", 10, "Images/Directors/quentintarantino.jpg");
    insertDirector("James Gunn", "Sem Descrição", "Masculino", 3, "Images/Directors/jamesgunn.jpg");
    insertDirector("Steven Spielberg", "Sem Descrição", "Masculino", 20, "Images/Directors/stevenspielberg.jpg");
    //Inserir Filmes
    insertMovie("Aquaman", "Sem Sinopse", 9.2, 10, "English", 2.3, 152, 8, "Images/Movies/aquaman.jpg");
    insertMovie("Black Panther", "Sem Sinopse", 6.8, 5, "English", 3.0, 122, 8, "Images/Movies/blackpanther.jpg");
    insertMovie("The Crimes of Grindelwald", "Sem Sinopse", 6.7, 8, "English", 1.8, 190, 8, "Images/Movies/crimesofgrindelwald.jpg");
    insertMovie("Halloween", "Sem Sinopse", 6.6, 2, "English", 2.145, 152, 18, "Images/Movies/halloween.jpg");
    insertMovie("Incredibles 2", "Sem Sinopse", 4.5, 1, "English", 1.354, 134, 10, "Images/Movies/incredibles2.jpg");
    insertMovie("Avengers - Infinity War", "Sem Sinopse", 10.0, 25, "English", 5.2, 139, 8, "Images/Movies/infinitywar.jpg");
    insertMovie("Jurassic World", "Sem Sinopse", 8.3, 6, "English", 2.0, 102, 12, "Images/Movies/jurassicworld.jpg");
    insertMovie("The Meg", "Sem Sinopse", 6.9, 4, "English", 1.89, 145, 12, "Images/Movies/meg.jpg");
    insertMovie("The Nun", "Sem Sinopse", 8.4, 12, "English", 1.6, 159, 18, "Images/Movies/nun.jpg");
    insertMovie("Predator", "Sem Sinopse", 5.6, 3, "English", 2.2, 123, 16, "Images/Movies/predator.jpg");
    insertMovie("Tomb Raider", "Sem Sinopse", 7.2, 4, "English", 2.5, 145, 14, "Images/Movies/tombraider.jpg");
    insertMovie("Venom", "Sem Sinopse", 7.9, 11, "English", 1.8, 126, 10, "Images/Movies/venom.jpg");
}


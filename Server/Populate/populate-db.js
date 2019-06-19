var database = require('../../Publish/Database/sqlite.js')('../Publish/Database/projeto_dbm.db');

function insertActor(name, decription, awards, gender, height, weight, curiosities, image){
    database.run('INSERT INTO Actor (name, description, awards, gender, height, weight, curiosities, image) VALUES (?,?,?,?,?,?,?,?)', 
    [name, decription, awards, gender, height, weight, curiosities, image]);    
}

function insertCategory(type){
    database.run('INSERT INTO Category (type) VALUES (?)', [type]);    
}

function insertDirector(name, description, gender, awards, image){
    database.run('INSERT INTO Director (name, description, gender, awards, image) VALUES (?,?,?,?,?)', 
    [name, description, gender, awards, image]);    
}

function insertMovie(title, synopsis, imdb_pontuation, awards, language, budget, duration, age_restriction, image){
    database.run('INSERT INTO Movie (title, synopsis, imdb_pontuation, awards, language, budget, duration, age_restriction, immage) VALUES (?,?,?,?,?)', 
    [title, synopsis, imdb_pontuation, awards, language, budget, duration, age_restriction, image]);    
}

function insertPlace(chair_number, row, room){
    database.run('INSERT INTO Place (chair_number, row, room_id) VALUES (?,?,?)', [chair_number, row, room]);    
}

function insertRoom(number){
    database.run('INSERT INTO Room (number) VALUES (?)', [number]);    
}

module.exports.execPopulate = function (){
    var numeroSalas = 11;
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
    insertActor("Angelina Jolie", "Sem Descrição", 3, "Feminino", 165, 50, "Sem Curiosidades", "/Publish/Populate/Actors/angelinajolie.jpg");
    insertActor("Brad Pitt", "Sem Descrição", 3, "Masculino", 172, 75, "Sem Curiosidades", "/Publish/Populate/Actors/bradpitt.jpg");
    insertActor("Christian Bale", "Sem Descrição", 3, "Masculino", 175, 82, "Sem Curiosidades", "/Publish/Populate/Actors/christianbale.jpg");
    insertActor("Emma Watson", "Sem Descrição", 3, "Feminino", 165, 52, "Sem Curiosidades", "/Publish/Populate/Actors/emmawatson.jpg");
    insertActor("Gal Gadot", "Sem Descrição", 3, "Feminino", 167, 56, "Sem Curiosidades", "/Publish/Populate/Actors/galgadot.jpg");
    insertActor("Jennifer Lawrence", "Sem Descrição", 3, "Feminino", 157, 51, "Sem Curiosidades", "/Publish/Populate/Actors/jenniferlawrence.jpg");
    insertActor("Leonardo DiCaprio", "Sem Descrição", 3, "Masculino", 186, 80, "Sem Curiosidades", "/Publish/Populate/Actors/leonardodicaprio.jpg");
    insertActor("Liam Neeson", "Sem Descrição", 3, "Masculino", 182, 85, "Sem Curiosidades", "/Publish/Populate/Actors/liamneeson.jpg");
    insertActor("Margot Robbie", "Sem Descrição", 3, "Feminino", 165, 53, "Sem Curiosidades", "/Publish/Populate/Actors/margotrobbie.jpg");
    insertActor("Mark Ruffalo", "Sem Descrição", 3, "Masculino", 175, 87, "Sem Curiosidades", "/Publish/Populate/Actors/markruffalo.jpg");
    insertActor("Matt Damon", "Sem Descrição", 3, "Masculino", 172, 80, "Sem Curiosidades", "/Publish/Populate/Actors/mattdamon.jpg");
    insertActor("Morgan Freeman", "Sem Descrição", 3, "Masculino", 167, 89, "Sem Curiosidades", "/Publish/Populate/Actors/morganfreeman.jpg");
    insertActor("Natalie Portman", "Sem Descrição", 3, "Feminino", 165, 57, "Sem Curiosidades", "/Publish/Populate/Actors/natalieportman.jpg");
    insertActor("Robert De Niro", "Sem Descrição", 3, "Masculino", 172, 78, "Sem Curiosidades", "/Publish/Populate/Actors/robertdeniro.jpg");
    insertActor("Samuel L Jackson", "Sem Descrição", 3, "Masculino", 178, 86, "Sem Curiosidades", "/Publish/Populate/Actors/samuelljackson.jpg");
    insertActor("Scarlett Johansson", "Sem Descrição", 3, "Feminino", 169, 55, "Sem Curiosidades", "/Publish/Populate/Actors/scarlettjohansson.jpg");
    insertActor("Tom Cruise", "Sem Descrição", 3, "Masculino", 175, 86, "Sem Curiosidades", "/Publish/Populate/Actors/tomcruise.jpg");
    insertActor("Tom Hanks", "Sem Descrição", 3, "Masculino", 172, 81, "Sem Curiosidades", "/Publish/Populate/Actors/tomhanks.jpg");
    //Inserir Diretores
    insertDirector("Quentin Tarantino", "Sem Descrição", "Masculino", 10, "/Publish/Populate/Directors/quentintarantino.jpg");
    insertDirector("James Gunn", "Sem Descrição", "Masculino", 3, "/Publish/Populate/Directors/jamesgunn.jpg");
    insertDirector("Steven Spielberg", "Sem Descrição", "Masculino", 20, "/Publish/Populate/Directors/stevenspielberg.jpg");
    //Inserir Filmes
    insertMovie("Aquaman", "Sem Sinopse", 9, 10, "English", 2000000000, 152, 8, "/Publish/Populate/Movies/aquaman.jpg");
    insertMovie("Black Panther", "Sem Sinopse", 6, 5, "English", 3000000000, 122, 8, "/Publish/Populate/Movies/blackpanther.jpg");
    insertMovie("The Crimes of Grindelwald", "Sem Sinopse", 6, 8, "English", 2000000000, 190, 8, "/Publish/Populate/Movies/crimesofgrindelwald.jpg");
    insertMovie("Halloween", "Sem Sinopse", 6, 2, "English", 2145000000, 152, 18, "/Publish/Populate/Movies/halloween.jpg");
    insertMovie("Incredibles 2", "Sem Sinopse", 4, 1, "English", 1354000000, 134, 10, "/Publish/Populate/Movies/incredibles2.jpg");
    insertMovie("Avengers - Infinity War", "Sem Sinopse", 10, 25, "English", 5000000000, 139, 8, "/Publish/Populate/Movies/infinitywar.jpg");
    insertMovie("Jurassic World", "Sem Sinopse", 8, 6, "English", 2000000000, 102, 12, "/Publish/Populate/Movies/jurassicworld.jpg");
    insertMovie("The Meg", "Sem Sinopse", 6, 4, "English", 1869000000, 145, 12, "/Publish/Populate/Movies/meg.jpg");
    insertMovie("The Nun", "Sem Sinopse", 8, 12, "English", 900000000, 159, 18, "/Publish/Populate/Movies/nun.jpg");
    insertMovie("Predator", "Sem Sinopse", 5, 3, "English", 2200000000, 123, 16, "/Publish/Populate/Movies/predator.jpg");
    insertMovie("Tomb Raider", "Sem Sinopse", 5, 4, "English", 2500000000, 145, 14, "/Publish/Populate/Movies/tombraider.jpg");
    insertMovie("Venom", "Sem Sinopse", 7, 11, "English", 1000000000, 126, 10, "/Publish/Populate/Movies/venom.jpg");
}


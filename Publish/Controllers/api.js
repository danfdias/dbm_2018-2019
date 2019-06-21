var express = require('express');
var router = express.Router();

/**
* Método que faz o mapeamento entre um objeto retornado pelo módulo sqlite num objeto de uma classe criada
* @param {any} object Representa o objeto retornado pela query à abse de dados
* @param {any} type Representa o tipo de objeto que se pretende converter
* @returns Devolve um objeto do tipo 'type' com o conteúdo que está no objeto 'object'
*/
function mapping(object, type) {
    var obj = new type();
    Object.keys(object).forEach(function (value) {
        //Se o objeto possuir o atributo que se está a verificar então recebe o valor retornado da query da base de dados
        if (obj.hasOwnProperty(value.toLowerCase())){
            obj[value.toLowerCase()] = object[value];
        }
    });
    return obj;
}

/************************************************************************************************************************************/
/**************************************************** Actor ***********************************************************/
/************************************************************************************************************************************/

var actor = require('../Models/Actor.js');

/**
* rota que chama a funcao save para fazer um insert a tabela Actor
*/
router.post('/Actor', function (req, res) {
    mapping(req.body, actor).save(function(){
        res.send('Registo Inserido');
        }); //converte o objeto retornado no corpo do pedido num objeto do tipo Aluno
});

/**
* rota que chama a funcao all que faz um select de toda a informacao numa tabela Actor
*/
router.get('/Actor', function (req, res) {
    actor.all(function (rows) { //função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

/**
* rota que chama a funcao get que faz um select de uma determinada coluna a tabela Actor 
*/
router.get('/Actor/:id', function (req, res) {
    actor.get(req.params.id, function (row) {
        res.json(row);
    });
});

/**
* rota que chama a funcao save para fazer um update de uma coluna a tabela Actor
*/
router.post('/Actor/:id', function (req, res) { 
    var obj = mapping(req.body, actor);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.redirect("http://localhost:8082/backoffice/Actor");
    });
});

/**
* rota que chama a funcao delete que faz um delete de uma coluna da tabela Actor
*/
router.delete('/Actor/:id', function (req, res) {
    actor.delete(parseInt(req.params.id), function () {
        res.json("Registo Eliminado");
    });
});

/************************************************************************************************************************************/
/**************************************************** Director ***********************************************************/
/************************************************************************************************************************************/

var director = require('../Models/Director.js');

/**
* rota que chama a funcao save para fazer um insert a tabela Director
*/
router.post('/Director', function (req, res) {
    mapping(req.body, director).save(function(){
        res.send('Registo Inserido');
        }); //converte o objeto retornado no corpo do pedido num objeto do tipo Aluno
});

/**
* rota que chama a funcao all que faz um select de toda a informacao numa tabela Director
*/
router.get('/Director', function (req, res) {
    director.all(function (rows) { //função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

/**
* rota que chama a funcao get que faz um select de uma determinada coluna a tabela Director 
*/
router.get('/Director/:id', function (req, res) {
    director.get(req.params.id, function (row) {
        res.json(row);
    });
});

/**
* rota que chama a funcao save para fazer um update de uma coluna a tabela Director
*/
router.post('/Director/:id', function (req, res) { 
    var obj = mapping(req.body, director);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.redirect("http://localhost:8082/backoffice/Director");
    });
});

/**
* rota que chama a funcao delete que faz um delete de uma coluna da tabela Director
*/
router.delete('/Director/:id', function (req, res) {
    director.delete(parseInt(req.params.id), function () {
        res.json("Registo Eliminado");
    });
});

/************************************************************************************************************************************/
/**************************************************** Category ***********************************************************/
/************************************************************************************************************************************/

var category = require('../Models/Category.js');

/**
* rota que chama a funcao save para fazer um insert a tabela Category
*/
router.post('/Category', function (req, res) {
    mapping(req.body, category).save(function(){
        res.send('Registo Inserido');
        }); //converte o objeto retornado no corpo do pedido num objeto do tipo Aluno
});

/**
* rota que chama a funcao all que faz um select de toda a informacao numa tabela Category
*/
router.get('/Category', function (req, res) {
    category.all(function (rows) { //função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

/**
* rota que chama a funcao get que faz um select de uma determinada coluna a tabela Category 
*/
router.get('/Category/:id', function (req, res) {
    category.get(req.params.id, function (row) {
        res.json(row);
    });
});

/**
* rota que chama a funcao save para fazer um update de uma coluna a tabela Category
*/
router.post('/Category/:id', function (req, res) { 
    var obj = mapping(req.body, category);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.redirect("http://localhost:8082/backoffice/Category");
    });
});

/**
* rota que chama a funcao delete que faz um delete de uma coluna da tabela Category
*/
router.delete('/Category/:id', function (req, res) {
    category.delete(parseInt(req.params.id), function () {
        res.json("Registo Eliminado");
    });
});

/************************************************************************************************************************************/
/**************************************************** Movie ***********************************************************/
/************************************************************************************************************************************/

var movie = require('../Models/Movie.js');

/**
* rota que chama a funcao save para fazer um insert a tabela Movie
*/
router.post('/Movie', function (req, res) {
    mapping(req.body, movie).save(function(){
        res.send('Registo Inserido');
        }); //converte o objeto retornado no corpo do pedido num objeto do tipo Aluno
});

/**
* rota que chama a funcao all que faz um select de toda a informacao numa tabela Movie
*/
router.get('/Movie', function (req, res) {
    movie.all(function (rows) { //função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

/**
* rota que chama a funcao get que faz um select de uma determinada coluna a tabela Movie 
*/
router.get('/Movie/:id', function (req, res) {
    movie.get(req.params.id, function (row) {
        res.json(row);
    });
});

/**
* rota que chama a funcao save para fazer um update de uma coluna a tabela Movie
*/
router.post('/Movie/:id', function (req, res) { 
    var obj = mapping(req.body, movie);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.redirect("http://localhost:8082/backoffice/Movie");
    });
});

/**
* rota que chama a funcao delete que faz um delete de uma coluna da tabela Movie
*/
router.delete('/Movie/:id', function (req, res) {
    movie.delete(parseInt(req.params.id), function () {
        res.json("Registo Eliminado");
    });
});

/************************************************************************************************************************************/
/**************************************************** Place ***********************************************************/
/************************************************************************************************************************************/

var place = require('../Models/Place.js');

/**
* rota que chama a funcao save para fazer um insert a tabela Place
*/
router.post('/Place', function (req, res) {
    mapping(req.body, place).save(function(){
        res.send('Registo Inserido');
        }); //converte o objeto retornado no corpo do pedido num objeto do tipo Aluno
});

/**
* rota que chama a funcao all que faz um select de toda a informacao numa tabela Place
*/
router.get('/Place', function (req, res) {
    place.all(function (rows) { //função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

/**
* rota que chama a funcao get que faz um select de uma determinada coluna a tabela Place 
*/
router.get('/Place/:id', function (req, res) {
    place.get(req.params.id, function (row) {
        res.json(row);
    });
});

/**
* rota que chama a funcao save para fazer um update de uma coluna a tabela Place
*/
router.post('/Place/:id', function (req, res) { 
    var obj = mapping(req.body, place);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.redirect("http://localhost:8082/backoffice/Place");
    });
});

/**
* rota que chama a funcao delete que faz um delete de uma coluna da tabela Place
*/
router.delete('/Place/:id', function (req, res) {
    place.delete(parseInt(req.params.id), function () {
        res.json("Registo Eliminado");
    });
});

/************************************************************************************************************************************/
/**************************************************** Room ***********************************************************/
/************************************************************************************************************************************/

var room = require('../Models/Room.js');

/**
* rota que chama a funcao save para fazer um insert a tabela Room
*/
router.post('/Room', function (req, res) {
    mapping(req.body, room).save(function(){
        res.send('Registo Inserido');
        }); //converte o objeto retornado no corpo do pedido num objeto do tipo Aluno
});

/**
* rota que chama a funcao all que faz um select de toda a informacao numa tabela Room
*/
router.get('/Room', function (req, res) {
    room.all(function (rows) { //função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

/**
* rota que chama a funcao get que faz um select de uma determinada coluna a tabela Room 
*/
router.get('/Room/:id', function (req, res) {
    room.get(req.params.id, function (row) {
        res.json(row);
    });
});

/**
* rota que chama a funcao save para fazer um update de uma coluna a tabela Room
*/
router.post('/Room/:id', function (req, res) { 
    var obj = mapping(req.body, room);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.redirect("http://localhost:8082/backoffice/Room");
    });
});

/**
* rota que chama a funcao delete que faz um delete de uma coluna da tabela Room
*/
router.delete('/Room/:id', function (req, res) {
    room.delete(parseInt(req.params.id), function () {
        res.json("Registo Eliminado");
    });
});

/************************************************************************************************************************************/
/**************************************************** Ticket ***********************************************************/
/************************************************************************************************************************************/

var ticket = require('../Models/Ticket.js');

/**
* rota que chama a funcao save para fazer um insert a tabela Ticket
*/
router.post('/Ticket', function (req, res) {
    mapping(req.body, ticket).save(function(){
        res.send('Registo Inserido');
        }); //converte o objeto retornado no corpo do pedido num objeto do tipo Aluno
});

/**
* rota que chama a funcao all que faz um select de toda a informacao numa tabela Ticket
*/
router.get('/Ticket', function (req, res) {
    ticket.all(function (rows) { //função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

/**
* rota que chama a funcao get que faz um select de uma determinada coluna a tabela Ticket 
*/
router.get('/Ticket/:id', function (req, res) {
    ticket.get(req.params.id, function (row) {
        res.json(row);
    });
});

/**
* rota que chama a funcao save para fazer um update de uma coluna a tabela Ticket
*/
router.post('/Ticket/:id', function (req, res) { 
    var obj = mapping(req.body, ticket);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.redirect("http://localhost:8082/backoffice/Ticket");
    });
});

/**
* rota que chama a funcao delete que faz um delete de uma coluna da tabela Ticket
*/
router.delete('/Ticket/:id', function (req, res) {
    ticket.delete(parseInt(req.params.id), function () {
        res.json("Registo Eliminado");
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();

/************************************************************************************************************************************/
/**************************************************** Actor ***********************************************************/
/************************************************************************************************************************************/

var Actor = require('../Models/Actor.js');

/**
* Método que faz o mapeamento entre um objeto retornado pelo módulo sqlite num objeto de uma classe criada
* @param {any} object Representa o objeto retornado pela query à abse de dados
* @param {any} type Representa o tipo de objeto que se pretende converter
* @returns Devolve um objeto do tipo "type" com o conteúdo que está no objeto "object"
*/
function mapping(object, type) {
    var obj = new type();
    Object.keys(object).forEach(function (value) {
        console.log(value);
        if (obj.hasOwnProperty(value)) //Se o objeto possuir o atributo que se está a verificar então recebe o valor retornado da query da base de dados
            obj[value] = object[value];
    });    
    return obj;
}

/**
* rota que chama a funcao save para fazer um insert a tabela Actor
*/
router.post('/Actor', function (req, res) {
    mapping(req.body, Actor).save(function(){
        res.send('insert');
        }); //converte o objeto retornado no corpo do pedido num objeto do tipo Aluno
});

/**
* rota que chama a funcao all que faz um select de toda a informacao numa tabela Actor
*/
router.get('/Actor', function (req, res) {
    Actor.all(function (rows) { //função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

/**
* rota que chama a funcao get que faz um select de uma determinada coluna a tabela Actor 
*/
router.get('/Actor/:id', function (req, res) {
    Actor.get(req.params.id, function (row) {
        res.json(row);
    });
});

/**
* rota que chama a funcao save para fazer um update de uma coluna a tabela Actor
*/
router.put('/Actor/:id', function (req, res) { //o id tanto poderia ir no corpo da mensagem como por parâmetro no url
    var obj = mapping(req.body, Actor);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            success: !err
        });
    });
});

/**
* rota que chama a funcao delete que faz um delete de uma coluna da tabela Actor
*/
router.delete('/Actor/:id', function (req, res) {
    Actor.delete(req.params.id, function (err) {
        res.json({
            success: !err
        });
    });
});

/************************************************************************************************************************************/
/**************************************************** Category ***********************************************************/
/************************************************************************************************************************************/

var Category = require('../Models/Category.js');

/**
* Método que faz o mapeamento entre um objeto retornado pelo módulo sqlite num objeto de uma classe criada
* @param {any} object Representa o objeto retornado pela query à abse de dados
* @param {any} type Representa o tipo de objeto que se pretende converter
* @returns Devolve um objeto do tipo "type" com o conteúdo que está no objeto "object"
*/
function mapping(object, type) {
    var obj = new type();
    Object.keys(object).forEach(function (value) {
        console.log(value);
        if (obj.hasOwnProperty(value)) //Se o objeto possuir o atributo que se está a verificar então recebe o valor retornado da query da base de dados
            obj[value] = object[value];
    });    
    return obj;
}

/**
* rota que chama a funcao save para fazer um insert a tabela Category
*/
router.post('/Category', function (req, res) {
    mapping(req.body, Category).save(function(){
        res.send('insert');
        }); //converte o objeto retornado no corpo do pedido num objeto do tipo Aluno
});

/**
* rota que chama a funcao all que faz um select de toda a informacao numa tabela Category
*/
router.get('/Category', function (req, res) {
    Category.all(function (rows) { //função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

/**
* rota que chama a funcao get que faz um select de uma determinada coluna a tabela Category 
*/
router.get('/Category/:id', function (req, res) {
    Category.get(req.params.id, function (row) {
        res.json(row);
    });
});

/**
* rota que chama a funcao save para fazer um update de uma coluna a tabela Category
*/
router.put('/Category/:id', function (req, res) { //o id tanto poderia ir no corpo da mensagem como por parâmetro no url
    var obj = mapping(req.body, Category);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            success: !err
        });
    });
});

/**
* rota que chama a funcao delete que faz um delete de uma coluna da tabela Category
*/
router.delete('/Category/:id', function (req, res) {
    Category.delete(req.params.id, function (err) {
        res.json({
            success: !err
        });
    });
});

/************************************************************************************************************************************/
/**************************************************** Director ***********************************************************/
/************************************************************************************************************************************/

var Director = require('../Models/Director.js');

/**
* Método que faz o mapeamento entre um objeto retornado pelo módulo sqlite num objeto de uma classe criada
* @param {any} object Representa o objeto retornado pela query à abse de dados
* @param {any} type Representa o tipo de objeto que se pretende converter
* @returns Devolve um objeto do tipo "type" com o conteúdo que está no objeto "object"
*/
function mapping(object, type) {
    var obj = new type();
    Object.keys(object).forEach(function (value) {
        console.log(value);
        if (obj.hasOwnProperty(value)) //Se o objeto possuir o atributo que se está a verificar então recebe o valor retornado da query da base de dados
            obj[value] = object[value];
    });    
    return obj;
}

/**
* rota que chama a funcao save para fazer um insert a tabela Director
*/
router.post('/Director', function (req, res) {
    mapping(req.body, Director).save(function(){
        res.send('insert');
        }); //converte o objeto retornado no corpo do pedido num objeto do tipo Aluno
});

/**
* rota que chama a funcao all que faz um select de toda a informacao numa tabela Director
*/
router.get('/Director', function (req, res) {
    Director.all(function (rows) { //função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

/**
* rota que chama a funcao get que faz um select de uma determinada coluna a tabela Director 
*/
router.get('/Director/:id', function (req, res) {
    Director.get(req.params.id, function (row) {
        res.json(row);
    });
});

/**
* rota que chama a funcao save para fazer um update de uma coluna a tabela Director
*/
router.put('/Director/:id', function (req, res) { //o id tanto poderia ir no corpo da mensagem como por parâmetro no url
    var obj = mapping(req.body, Director);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            success: !err
        });
    });
});

/**
* rota que chama a funcao delete que faz um delete de uma coluna da tabela Director
*/
router.delete('/Director/:id', function (req, res) {
    Director.delete(req.params.id, function (err) {
        res.json({
            success: !err
        });
    });
});

/************************************************************************************************************************************/
/**************************************************** Movie ***********************************************************/
/************************************************************************************************************************************/

var Movie = require('../Models/Movie.js');

/**
* Método que faz o mapeamento entre um objeto retornado pelo módulo sqlite num objeto de uma classe criada
* @param {any} object Representa o objeto retornado pela query à abse de dados
* @param {any} type Representa o tipo de objeto que se pretende converter
* @returns Devolve um objeto do tipo "type" com o conteúdo que está no objeto "object"
*/
function mapping(object, type) {
    var obj = new type();
    Object.keys(object).forEach(function (value) {
        console.log(value);
        if (obj.hasOwnProperty(value)) //Se o objeto possuir o atributo que se está a verificar então recebe o valor retornado da query da base de dados
            obj[value] = object[value];
    });    
    return obj;
}

/**
* rota que chama a funcao save para fazer um insert a tabela Movie
*/
router.post('/Movie', function (req, res) {
    mapping(req.body, Movie).save(function(){
        res.send('insert');
        }); //converte o objeto retornado no corpo do pedido num objeto do tipo Aluno
});

/**
* rota que chama a funcao all que faz um select de toda a informacao numa tabela Movie
*/
router.get('/Movie', function (req, res) {
    Movie.all(function (rows) { //função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

/**
* rota que chama a funcao get que faz um select de uma determinada coluna a tabela Movie 
*/
router.get('/Movie/:id', function (req, res) {
    Movie.get(req.params.id, function (row) {
        res.json(row);
    });
});

/**
* rota que chama a funcao save para fazer um update de uma coluna a tabela Movie
*/
router.put('/Movie/:id', function (req, res) { //o id tanto poderia ir no corpo da mensagem como por parâmetro no url
    var obj = mapping(req.body, Movie);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            success: !err
        });
    });
});

/**
* rota que chama a funcao delete que faz um delete de uma coluna da tabela Movie
*/
router.delete('/Movie/:id', function (req, res) {
    Movie.delete(req.params.id, function (err) {
        res.json({
            success: !err
        });
    });
});

/************************************************************************************************************************************/
/**************************************************** Place ***********************************************************/
/************************************************************************************************************************************/

var Place = require('../Models/Place.js');

/**
* Método que faz o mapeamento entre um objeto retornado pelo módulo sqlite num objeto de uma classe criada
* @param {any} object Representa o objeto retornado pela query à abse de dados
* @param {any} type Representa o tipo de objeto que se pretende converter
* @returns Devolve um objeto do tipo "type" com o conteúdo que está no objeto "object"
*/
function mapping(object, type) {
    var obj = new type();
    Object.keys(object).forEach(function (value) {
        console.log(value);
        if (obj.hasOwnProperty(value)) //Se o objeto possuir o atributo que se está a verificar então recebe o valor retornado da query da base de dados
            obj[value] = object[value];
    });    
    return obj;
}

/**
* rota que chama a funcao save para fazer um insert a tabela Place
*/
router.post('/Place', function (req, res) {
    mapping(req.body, Place).save(function(){
        res.send('insert');
        }); //converte o objeto retornado no corpo do pedido num objeto do tipo Aluno
});

/**
* rota que chama a funcao all que faz um select de toda a informacao numa tabela Place
*/
router.get('/Place', function (req, res) {
    Place.all(function (rows) { //função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

/**
* rota que chama a funcao get que faz um select de uma determinada coluna a tabela Place 
*/
router.get('/Place/:id', function (req, res) {
    Place.get(req.params.id, function (row) {
        res.json(row);
    });
});

/**
* rota que chama a funcao save para fazer um update de uma coluna a tabela Place
*/
router.put('/Place/:id', function (req, res) { //o id tanto poderia ir no corpo da mensagem como por parâmetro no url
    var obj = mapping(req.body, Place);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            success: !err
        });
    });
});

/**
* rota que chama a funcao delete que faz um delete de uma coluna da tabela Place
*/
router.delete('/Place/:id', function (req, res) {
    Place.delete(req.params.id, function (err) {
        res.json({
            success: !err
        });
    });
});

/************************************************************************************************************************************/
/**************************************************** Room ***********************************************************/
/************************************************************************************************************************************/

var Room = require('../Models/Room.js');

/**
* Método que faz o mapeamento entre um objeto retornado pelo módulo sqlite num objeto de uma classe criada
* @param {any} object Representa o objeto retornado pela query à abse de dados
* @param {any} type Representa o tipo de objeto que se pretende converter
* @returns Devolve um objeto do tipo "type" com o conteúdo que está no objeto "object"
*/
function mapping(object, type) {
    var obj = new type();
    Object.keys(object).forEach(function (value) {
        console.log(value);
        if (obj.hasOwnProperty(value)) //Se o objeto possuir o atributo que se está a verificar então recebe o valor retornado da query da base de dados
            obj[value] = object[value];
    });    
    return obj;
}

/**
* rota que chama a funcao save para fazer um insert a tabela Room
*/
router.post('/Room', function (req, res) {
    mapping(req.body, Room).save(function(){
        res.send('insert');
        }); //converte o objeto retornado no corpo do pedido num objeto do tipo Aluno
});

/**
* rota que chama a funcao all que faz um select de toda a informacao numa tabela Room
*/
router.get('/Room', function (req, res) {
    Room.all(function (rows) { //função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

/**
* rota que chama a funcao get que faz um select de uma determinada coluna a tabela Room 
*/
router.get('/Room/:id', function (req, res) {
    Room.get(req.params.id, function (row) {
        res.json(row);
    });
});

/**
* rota que chama a funcao save para fazer um update de uma coluna a tabela Room
*/
router.put('/Room/:id', function (req, res) { //o id tanto poderia ir no corpo da mensagem como por parâmetro no url
    var obj = mapping(req.body, Room);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            success: !err
        });
    });
});

/**
* rota que chama a funcao delete que faz um delete de uma coluna da tabela Room
*/
router.delete('/Room/:id', function (req, res) {
    Room.delete(req.params.id, function (err) {
        res.json({
            success: !err
        });
    });
});

/************************************************************************************************************************************/
/**************************************************** Ticket ***********************************************************/
/************************************************************************************************************************************/

var Ticket = require('../Models/Ticket.js');

/**
* Método que faz o mapeamento entre um objeto retornado pelo módulo sqlite num objeto de uma classe criada
* @param {any} object Representa o objeto retornado pela query à abse de dados
* @param {any} type Representa o tipo de objeto que se pretende converter
* @returns Devolve um objeto do tipo "type" com o conteúdo que está no objeto "object"
*/
function mapping(object, type) {
    var obj = new type();
    Object.keys(object).forEach(function (value) {
        console.log(value);
        if (obj.hasOwnProperty(value)) //Se o objeto possuir o atributo que se está a verificar então recebe o valor retornado da query da base de dados
            obj[value] = object[value];
    });    
    return obj;
}

/**
* rota que chama a funcao save para fazer um insert a tabela Ticket
*/
router.post('/Ticket', function (req, res) {
    mapping(req.body, Ticket).save(function(){
        res.send('insert');
        }); //converte o objeto retornado no corpo do pedido num objeto do tipo Aluno
});

/**
* rota que chama a funcao all que faz um select de toda a informacao numa tabela Ticket
*/
router.get('/Ticket', function (req, res) {
    Ticket.all(function (rows) { //função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

/**
* rota que chama a funcao get que faz um select de uma determinada coluna a tabela Ticket 
*/
router.get('/Ticket/:id', function (req, res) {
    Ticket.get(req.params.id, function (row) {
        res.json(row);
    });
});

/**
* rota que chama a funcao save para fazer um update de uma coluna a tabela Ticket
*/
router.put('/Ticket/:id', function (req, res) { //o id tanto poderia ir no corpo da mensagem como por parâmetro no url
    var obj = mapping(req.body, Ticket);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            success: !err
        });
    });
});

/**
* rota que chama a funcao delete que faz um delete de uma coluna da tabela Ticket
*/
router.delete('/Ticket/:id', function (req, res) {
    Ticket.delete(req.params.id, function (err) {
        res.json({
            success: !err
        });
    });
});module.exports = router;
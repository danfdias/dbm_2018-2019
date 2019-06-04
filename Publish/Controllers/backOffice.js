var express = require('express');
var router = express.Router();
/************************************************************************************************************************************/
/*************************************************** BackOffice Rotas **********************************************************/
/************************************************************************************************************************************/

var Actor = require('../Models/Actor.js');

router.get('/Actor', function (req, res) {
    Actor.all(function(elements){
        console.log(elements.length);
        console.log(elements);        
        var rows = new Array();
        /*elements.foreach(function(element){
            console.log(element);
        });*/
    });
/*
    res.render('', {
        title: controllerTitle,
        columns: ,
        rows:
    })*/
});
/************************************************************************************************************************************/
/*************************************************** BackOffice Rotas **********************************************************/
/************************************************************************************************************************************/

var Category = require('../Models/Category.js');

router.get('/Category', function (req, res) {
    Category.all(function(elements){
        console.log(elements.length);
        console.log(elements);        
        var rows = new Array();
        /*elements.foreach(function(element){
            console.log(element);
        });*/
    });
/*
    res.render('', {
        title: controllerTitle,
        columns: ,
        rows:
    })*/
});
/************************************************************************************************************************************/
/*************************************************** BackOffice Rotas **********************************************************/
/************************************************************************************************************************************/

var Director = require('../Models/Director.js');

router.get('/Director', function (req, res) {
    Director.all(function(elements){
        console.log(elements.length);
        console.log(elements);        
        var rows = new Array();
        /*elements.foreach(function(element){
            console.log(element);
        });*/
    });
/*
    res.render('', {
        title: controllerTitle,
        columns: ,
        rows:
    })*/
});
/************************************************************************************************************************************/
/*************************************************** BackOffice Rotas **********************************************************/
/************************************************************************************************************************************/

var Movie = require('../Models/Movie.js');

router.get('/Movie', function (req, res) {
    Movie.all(function(elements){
        console.log(elements.length);
        console.log(elements);        
        var rows = new Array();
        /*elements.foreach(function(element){
            console.log(element);
        });*/
    });
/*
    res.render('', {
        title: controllerTitle,
        columns: ,
        rows:
    })*/
});
/************************************************************************************************************************************/
/*************************************************** BackOffice Rotas **********************************************************/
/************************************************************************************************************************************/

var Place = require('../Models/Place.js');

router.get('/Place', function (req, res) {
    Place.all(function(elements){
        console.log(elements.length);
        console.log(elements);        
        var rows = new Array();
        /*elements.foreach(function(element){
            console.log(element);
        });*/
    });
/*
    res.render('', {
        title: controllerTitle,
        columns: ,
        rows:
    })*/
});
/************************************************************************************************************************************/
/*************************************************** BackOffice Rotas **********************************************************/
/************************************************************************************************************************************/

var Room = require('../Models/Room.js');

router.get('/Room', function (req, res) {
    Room.all(function(elements){
        console.log(elements.length);
        console.log(elements);        
        var rows = new Array();
        /*elements.foreach(function(element){
            console.log(element);
        });*/
    });
/*
    res.render('', {
        title: controllerTitle,
        columns: ,
        rows:
    })*/
});
/************************************************************************************************************************************/
/*************************************************** BackOffice Rotas **********************************************************/
/************************************************************************************************************************************/

var Ticket = require('../Models/Ticket.js');

router.get('/Ticket', function (req, res) {
    Ticket.all(function(elements){
        console.log(elements.length);
        console.log(elements);        
        var rows = new Array();
        /*elements.foreach(function(element){
            console.log(element);
        });*/
    });
/*
    res.render('', {
        title: controllerTitle,
        columns: ,
        rows:
    })*/
});

module.exports = router;
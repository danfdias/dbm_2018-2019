var express = require('express');
var bodyParser = require('body-parser');
var frontofficeRouter = express.Router();
var arr = [
    {
        name: "Actor",
        href: "./backoffice/Actor",
        icon: "fas fa-users"
    },
    {
        name: "Director",
        href: "./backoffice/Director",
        icon: "fas fa-users"
    },
    {
        name: "Category",
        href: "./backoffice/Category",
        icon: "fas fa-filter"
    },
    {
        name: "Movie",
        href: "./backoffice/Movie",
        icon: "fas fa-film"
    },
    {
        name: "Place",
        href: "./backoffice/Place",
        icon: "fas fa-couch"
    },
    {
        name: "Room",
        href: "./backoffice/Room",
        icon: "fas fa-person-booth"
    },
    {
        name: "Ticket",
        href: "./backoffice/Ticket",
        icon: "fas fa-ticket-alt"
    }
];

/************************************************************************************************************************************/
/*************************************************** FrontOffice TopViews **********************************************************/
/************************************************************************************************************************************/

var actor = require('../Models/Actor.js');
var actorSchema = require('../Models/Actor-schema.js');
var movie = require('../Models/Movie.js');
var movieSchema = require('../Models/Movie-schema.js');
var director = require('../Models/Director.js');
var directorSchema = require('../Models/Director-schema.js');
var movie = require('../Models/Movie.js');
var movieSchema = require('../Models/Movie-schema.js');

/**
 * Rota da que vai fazer render do ficheiro frontoffice.mustache com a informação devolvida da função
 * ordered da classe  
 *
 */
frontofficeRouter.get('/',function(req,res) {
    var renderObject = {
        cssPath: [
                { css: "css/default.css"},
                { css: "css/nav.css"},
                { css: "css/all.css"},
                { css: "css/tops.css"}
            ],
        controllers:  arr,
        titles: []
    };
    actor.top("awards", "DESC", "10", function (rows) {
        renderObject.query1_first5 = get5(rows, 1, "awards");
        renderObject.query1_last5 = get5(rows, renderObject.query1_first5.length + 1, "awards");
        renderObject.titles.push("TOP 10 ACTORS (AWARDS)");
        movie.top("imdb_pontuation", "DESC", "10", function (rows) {
            renderObject.query2_first5 = get5(rows, 1, "imdb_pontuation");
            renderObject.query2_last5 = get5(rows, renderObject.query2_first5.length + 1, "imdb_pontuation");
            renderObject.titles.push("TOP 10 MOVIES (IMDb)");
            director.top("awards", "DESC", "10", function (rows) {
                renderObject.query3_first5 = get5(rows, 1, "awards");
                renderObject.query3_last5 = get5(rows, renderObject.query3_first5.length + 1, "awards");
                renderObject.titles.push("TOP 10 DIRECTORS (AWARDS)");
                movie.top("awards", "DESC", "10", function (rows) {
                    renderObject.query4_first5 = get5(rows, 1, "awards");
                    renderObject.query4_last5 = get5(rows, renderObject.query4_first5.length + 1, "awards");
                    renderObject.titles.push("TOP 10 MOVIES (AWARDS)");
                    res.render('frontoffice', renderObject);
                });
            });
        });
    });
});

function get5(array, index, rankType){
    var array_return = [];
    var array_aux = [];
    var index_aux = index;
    var stringPathStart = "./";
    if(array.length > 0){        
        if(array.length >= 5){
            array_aux = array.splice(0,5);        
        }else array_aux = array.splice(0,array.length);   
    }     
    if(array_aux.length > 0){
        array_aux.forEach(function(element){
            array_return.push(
                {
                    element: element,
                    title: index_aux.toString().concat("º ", element.name, " (", element[rankType], ")"),
                    href: stringPathStart.concat("backoffice/", element.constructor.name, "/Detalhe/", element.id)
                }
            );
            index_aux++;
        });
    }

    array_return.forEach(function (element){
        console.log(element);
    });
    return array_return; 
}

module.exports = frontofficeRouter;
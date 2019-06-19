var express = require('express');
var bodyParser = require('body-parser');
var frontofficeRouter = express.Router();
var arr = [
    {
        name: "Actor",
        href: "./backoffice/Actor"
    },
    {
        name: "Director",
        href: "./backoffice/Director"
    },
    {
        name: "Category",
        href: "./backoffice/Category"
    },
    {
        name: "Movie",
        href: "./backoffice/Movie"
    },
    {
        name: "Place",
        href: "./backoffice/Place"
    },
    {
        name: "Room",
        href: "./backoffice/Room"
    },
    {
        name: "Ticket",
        href: "./backoffice/Ticket"
    }
];

/************************************************************************************************************************************/
/*************************************************** FrontOffice TopViews **********************************************************/
/************************************************************************************************************************************/

var movie = require('../Models/Movie.js');
var movieSchema = require('../Models/Movie-schema.js');
var movie = require('../Models/Movie.js');
var movieSchema = require('../Models/Movie-schema.js');
var movie = require('../Models/Movie.js');
var movieSchema = require('../Models/Movie-schema.js');
var actor = require('../Models/Actor.js');
var actorSchema = require('../Models/Actor-schema.js');

/**
 * Rota da que vai fazer render do ficheiro frontoffice.mustache com a informação devolvida da função
 * ordered da classe 
 *
 */
frontofficeRouter.get('/',function(req,res) {
    res.render('frontoffice', {
            cssPath: "http://localhost:8082/style.css",
            controllers:  arr,
            /*rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    })
                }
            }),
            columns: Object.keys(new ()).map(key => {
                return {
                    name: key
                };
            })*/
        });
    /*.top("", "", "", function (rows) {
        console.log("estou aqui");
        console.log(rows);
        
    });*/
});
module.exports = frontofficeRouter;
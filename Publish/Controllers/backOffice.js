/************************************************************************************************************************************/
/*************************************************** BackOffice Rotas **********************************************************/
/************************************************************************************************************************************/
var express = require('express');
var bodyParser = require('body-parser');
var backofficeRouter = express.Router();

/************************************************************************************************************************************/
/*************************************************** Actor **********************************************************/
/************************************************************************************************************************************/

var actor = require('../Models/Actor.js');
var actorSchema = require('../Models/Actor-schema.js');

/**
 * Rota que faz render do ficheiro list.mustache com a informação devolvida pela função
 * all da classe Actor
 *
 */
backofficeRouter.get('/Actor',function(req,res) {    
    actor.all(function (rows) {
        res.render('list', {
            title: 'Actor',
            cssPath: [
                { css: "../css/default.css"},
                { css: "../css/nav.css"},
                { css: "../css/all.css"},
                { css: "../css/tops.css"}
            ],
            rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Actor/Detalhe/' + obj.id,
                        image: {
                            src: '../Images/read.png'
                        },
                        tooltip: 'Ver Detalhes'
                    }, {
                        label: '',
                        link: './Actor/Editar/' + obj.id,
                        image: {
                            src: '../Images/edit.png'
                        },
                        tooltip: 'Editar'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../Images/delete.png'
                        },
                        tooltip: 'Apagar',
                        events: [{
                            name: "onclick",
                            function: "apagar",
                            args: obj.id
                        }]

                    }]
                }
            }),
            columns: Object.keys(new actor()).map(key => {
                return {
                    name: capitalizeFirstLetter(key)
                };
            }),
            insert: true
        });
    });
});

/**
 * Rota que faz render do ficheiro details.mustache com a informação devolvida pela função
 * get da classe Actor
 *
 */
backofficeRouter.get('/Actor/Detalhe/:id', function (req, res) {
    actor.get(req.params.id, function (row) {
        res.render('details', {
            properties: function () {
                var element = row[0];
                var allProps = Object.getOwnPropertyNames(element);
                var validProps = [];
                allProps.forEach(function (prop) {
                    if (actorSchema.properties.hasOwnProperty(prop)) {
                        if(prop.toString() != "image"){
                            validProps.push({
                                name: capitalizeFirstLetter(prop),
                                value: element[prop]
                            });
                        }
                    }
                });
                return validProps;
            },
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            imagePath: "../../../" + row[0].image,
            title: "Actor"
        });
    });
});

/**
 * Rota que faz render do ficheiro form1.mustache que consite no fomulario de inserção de um elemento
 * to tipo Actor
 *
 */
backofficeRouter.get('/Actor/Inserir',function(req,res) {
   var props =  Object.getOwnPropertyNames(new actor()).map(key => {
                        if(Object.keys(actorSchema.properties).includes(key)){
                        var typeAux = actorSchema.properties[key].type;
                        if(typeAux === 'integer'){
                            typeAux = 'number';
                        }else if(typeAux === 'string')typeAux = 'text';
                        var obj = {
                            name: capitalizeFirstLetter(key),
                            required : actorSchema.required.includes(key),
                            type: typeAux,
                            min : actorSchema.properties[key].minimum,
                            max : actorSchema.properties[key].maximum
                        }        

                        return obj;
                        }
            });
    var propsaux = [];
    for(var i = 0;i<props.length;i++){
        if(props[i] !== void 0 && props[i].name.substr(props[i].name.length - 2) !== "id"){
            propsaux.push(props[i]);
        }
    }

    res.render('form1', {
            title: 'Actor',
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            properties: propsaux            
    });
});

/**
 * Rota que faz render do ficheiro form2.mustache que consite no fomulario de editar um elemento
 * to tipo Actor
 *
 */
backofficeRouter.get('/Actor/Editar/:id',function(req,res) {
    actor.get(req.params.id,function (row) {
        var element = row[0];
    var props =  Object.getOwnPropertyNames(new actor()).map(key => {
                        if(Object.keys(actorSchema.properties).includes(key)){
                        var typeAux = actorSchema.properties[key].type;
                        if(typeAux === 'integer'){
                            typeAux = 'number';
                        }else if(typeAux === 'string')typeAux = 'text';
                        var obj = {
                            name: capitalizeFirstLetter(key),
                            val : element[key],
                            required : actorSchema.required.includes(key),
                            type: typeAux
                        }        

                        return obj;
                        }
            });
    var propsaux = [];
    for(var i = 0;i<props.length;i++){
        if(props[i] !== void 0 && props[i].name.substr(props[i].name.length - 2) !== "id"){
            propsaux.push(props[i]);
        }
    }

    res.render('form2', {
            title: 'Actor',
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            idClass: req.params.id,
            properties: propsaux
            }
        )
    });
});

/************************************************************************************************************************************/
/*************************************************** Director **********************************************************/
/************************************************************************************************************************************/

var director = require('../Models/Director.js');
var directorSchema = require('../Models/Director-schema.js');

/**
 * Rota que faz render do ficheiro list.mustache com a informação devolvida pela função
 * all da classe Director
 *
 */
backofficeRouter.get('/Director',function(req,res) {    
    director.all(function (rows) {
        res.render('list', {
            title: 'Director',
            cssPath: [
                { css: "../css/default.css"},
                { css: "../css/nav.css"},
                { css: "../css/all.css"},
                { css: "../css/tops.css"}
            ],
            rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Director/Detalhe/' + obj.id,
                        image: {
                            src: '../Images/read.png'
                        },
                        tooltip: 'Ver Detalhes'
                    }, {
                        label: '',
                        link: './Director/Editar/' + obj.id,
                        image: {
                            src: '../Images/edit.png'
                        },
                        tooltip: 'Editar'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../Images/delete.png'
                        },
                        tooltip: 'Apagar',
                        events: [{
                            name: "onclick",
                            function: "apagar",
                            args: obj.id
                        }]

                    }]
                }
            }),
            columns: Object.keys(new director()).map(key => {
                return {
                    name: capitalizeFirstLetter(key)
                };
            }),
            insert: true
        });
    });
});

/**
 * Rota que faz render do ficheiro details.mustache com a informação devolvida pela função
 * get da classe Director
 *
 */
backofficeRouter.get('/Director/Detalhe/:id', function (req, res) {
    director.get(req.params.id, function (row) {
        res.render('details', {
            properties: function () {
                var element = row[0];
                var allProps = Object.getOwnPropertyNames(element);
                var validProps = [];
                allProps.forEach(function (prop) {
                    if (directorSchema.properties.hasOwnProperty(prop)) {
                        if(prop.toString() != "image"){
                            validProps.push({
                                name: capitalizeFirstLetter(prop),
                                value: element[prop]
                            });
                        }
                    }
                });
                return validProps;
            },
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            imagePath: "../../../" + row[0].image,
            title: "Director"
        });
    });
});

/**
 * Rota que faz render do ficheiro form1.mustache que consite no fomulario de inserção de um elemento
 * to tipo Director
 *
 */
backofficeRouter.get('/Director/Inserir',function(req,res) {
   var props =  Object.getOwnPropertyNames(new director()).map(key => {
                        if(Object.keys(directorSchema.properties).includes(key)){
                        var typeAux = directorSchema.properties[key].type;
                        if(typeAux === 'integer'){
                            typeAux = 'number';
                        }else if(typeAux === 'string')typeAux = 'text';
                        var obj = {
                            name: capitalizeFirstLetter(key),
                            required : directorSchema.required.includes(key),
                            type: typeAux,
                            min : directorSchema.properties[key].minimum,
                            max : directorSchema.properties[key].maximum
                        }        

                        return obj;
                        }
            });
    var propsaux = [];
    for(var i = 0;i<props.length;i++){
        if(props[i] !== void 0 && props[i].name.substr(props[i].name.length - 2) !== "id"){
            propsaux.push(props[i]);
        }
    }

    res.render('form1', {
            title: 'Director',
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            properties: propsaux            
    });
});

/**
 * Rota que faz render do ficheiro form2.mustache que consite no fomulario de editar um elemento
 * to tipo Director
 *
 */
backofficeRouter.get('/Director/Editar/:id',function(req,res) {
    director.get(req.params.id,function (row) {
        var element = row[0];
    var props =  Object.getOwnPropertyNames(new director()).map(key => {
                        if(Object.keys(directorSchema.properties).includes(key)){
                        var typeAux = directorSchema.properties[key].type;
                        if(typeAux === 'integer'){
                            typeAux = 'number';
                        }else if(typeAux === 'string')typeAux = 'text';
                        var obj = {
                            name: capitalizeFirstLetter(key),
                            val : element[key],
                            required : directorSchema.required.includes(key),
                            type: typeAux
                        }        

                        return obj;
                        }
            });
    var propsaux = [];
    for(var i = 0;i<props.length;i++){
        if(props[i] !== void 0 && props[i].name.substr(props[i].name.length - 2) !== "id"){
            propsaux.push(props[i]);
        }
    }

    res.render('form2', {
            title: 'Director',
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            idClass: req.params.id,
            properties: propsaux
            }
        )
    });
});

/************************************************************************************************************************************/
/*************************************************** Category **********************************************************/
/************************************************************************************************************************************/

var category = require('../Models/Category.js');
var categorySchema = require('../Models/Category-schema.js');

/**
 * Rota que faz render do ficheiro list.mustache com a informação devolvida pela função
 * all da classe Category
 *
 */
backofficeRouter.get('/Category',function(req,res) {    
    category.all(function (rows) {
        res.render('list', {
            title: 'Category',
            cssPath: [
                { css: "../css/default.css"},
                { css: "../css/nav.css"},
                { css: "../css/all.css"},
                { css: "../css/tops.css"}
            ],
            rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Category/Detalhe/' + obj.id,
                        image: {
                            src: '../Images/read.png'
                        },
                        tooltip: 'Ver Detalhes'
                    }, {
                        label: '',
                        link: './Category/Editar/' + obj.id,
                        image: {
                            src: '../Images/edit.png'
                        },
                        tooltip: 'Editar'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../Images/delete.png'
                        },
                        tooltip: 'Apagar',
                        events: [{
                            name: "onclick",
                            function: "apagar",
                            args: obj.id
                        }]

                    }]
                }
            }),
            columns: Object.keys(new category()).map(key => {
                return {
                    name: capitalizeFirstLetter(key)
                };
            }),
            insert: true
        });
    });
});

/**
 * Rota que faz render do ficheiro details.mustache com a informação devolvida pela função
 * get da classe Category
 *
 */
backofficeRouter.get('/Category/Detalhe/:id', function (req, res) {
    category.get(req.params.id, function (row) {
        res.render('details', {
            properties: function () {
                var element = row[0];
                var allProps = Object.getOwnPropertyNames(element);
                var validProps = [];
                allProps.forEach(function (prop) {
                    if (categorySchema.properties.hasOwnProperty(prop)) {
                        if(prop.toString() != "image"){
                            validProps.push({
                                name: capitalizeFirstLetter(prop),
                                value: element[prop]
                            });
                        }
                    }
                });
                return validProps;
            },
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            imagePath: "../../../" + row[0].image,
            title: "Category"
        });
    });
});

/**
 * Rota que faz render do ficheiro form1.mustache que consite no fomulario de inserção de um elemento
 * to tipo Category
 *
 */
backofficeRouter.get('/Category/Inserir',function(req,res) {
   var props =  Object.getOwnPropertyNames(new category()).map(key => {
                        if(Object.keys(categorySchema.properties).includes(key)){
                        var typeAux = categorySchema.properties[key].type;
                        if(typeAux === 'integer'){
                            typeAux = 'number';
                        }else if(typeAux === 'string')typeAux = 'text';
                        var obj = {
                            name: capitalizeFirstLetter(key),
                            required : categorySchema.required.includes(key),
                            type: typeAux,
                            min : categorySchema.properties[key].minimum,
                            max : categorySchema.properties[key].maximum
                        }        

                        return obj;
                        }
            });
    var propsaux = [];
    for(var i = 0;i<props.length;i++){
        if(props[i] !== void 0 && props[i].name.substr(props[i].name.length - 2) !== "id"){
            propsaux.push(props[i]);
        }
    }

    res.render('form1', {
            title: 'Category',
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            properties: propsaux            
    });
});

/**
 * Rota que faz render do ficheiro form2.mustache que consite no fomulario de editar um elemento
 * to tipo Category
 *
 */
backofficeRouter.get('/Category/Editar/:id',function(req,res) {
    category.get(req.params.id,function (row) {
        var element = row[0];
    var props =  Object.getOwnPropertyNames(new category()).map(key => {
                        if(Object.keys(categorySchema.properties).includes(key)){
                        var typeAux = categorySchema.properties[key].type;
                        if(typeAux === 'integer'){
                            typeAux = 'number';
                        }else if(typeAux === 'string')typeAux = 'text';
                        var obj = {
                            name: capitalizeFirstLetter(key),
                            val : element[key],
                            required : categorySchema.required.includes(key),
                            type: typeAux
                        }        

                        return obj;
                        }
            });
    var propsaux = [];
    for(var i = 0;i<props.length;i++){
        if(props[i] !== void 0 && props[i].name.substr(props[i].name.length - 2) !== "id"){
            propsaux.push(props[i]);
        }
    }

    res.render('form2', {
            title: 'Category',
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            idClass: req.params.id,
            properties: propsaux
            }
        )
    });
});

/************************************************************************************************************************************/
/*************************************************** Movie **********************************************************/
/************************************************************************************************************************************/

var movie = require('../Models/Movie.js');
var movieSchema = require('../Models/Movie-schema.js');

/**
 * Rota que faz render do ficheiro list.mustache com a informação devolvida pela função
 * all da classe Movie
 *
 */
backofficeRouter.get('/Movie',function(req,res) {    
    movie.all(function (rows) {
        res.render('list', {
            title: 'Movie',
            cssPath: [
                { css: "../css/default.css"},
                { css: "../css/nav.css"},
                { css: "../css/all.css"},
                { css: "../css/tops.css"}
            ],
            rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Movie/Detalhe/' + obj.id,
                        image: {
                            src: '../Images/read.png'
                        },
                        tooltip: 'Ver Detalhes'
                    }, {
                        label: '',
                        link: './Movie/Editar/' + obj.id,
                        image: {
                            src: '../Images/edit.png'
                        },
                        tooltip: 'Editar'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../Images/delete.png'
                        },
                        tooltip: 'Apagar',
                        events: [{
                            name: "onclick",
                            function: "apagar",
                            args: obj.id
                        }]

                    }]
                }
            }),
            columns: Object.keys(new movie()).map(key => {
                return {
                    name: capitalizeFirstLetter(key)
                };
            }),
            insert: true
        });
    });
});

/**
 * Rota que faz render do ficheiro details.mustache com a informação devolvida pela função
 * get da classe Movie
 *
 */
backofficeRouter.get('/Movie/Detalhe/:id', function (req, res) {
    movie.get(req.params.id, function (row) {
        res.render('details', {
            properties: function () {
                var element = row[0];
                var allProps = Object.getOwnPropertyNames(element);
                var validProps = [];
                allProps.forEach(function (prop) {
                    if (movieSchema.properties.hasOwnProperty(prop)) {
                        if(prop.toString() != "image"){
                            validProps.push({
                                name: capitalizeFirstLetter(prop),
                                value: element[prop]
                            });
                        }
                    }
                });
                return validProps;
            },
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            imagePath: "../../../" + row[0].image,
            title: "Movie"
        });
    });
});

/**
 * Rota que faz render do ficheiro form1.mustache que consite no fomulario de inserção de um elemento
 * to tipo Movie
 *
 */
backofficeRouter.get('/Movie/Inserir',function(req,res) {
   var props =  Object.getOwnPropertyNames(new movie()).map(key => {
                        if(Object.keys(movieSchema.properties).includes(key)){
                        var typeAux = movieSchema.properties[key].type;
                        if(typeAux === 'integer'){
                            typeAux = 'number';
                        }else if(typeAux === 'string')typeAux = 'text';
                        var obj = {
                            name: capitalizeFirstLetter(key),
                            required : movieSchema.required.includes(key),
                            type: typeAux,
                            min : movieSchema.properties[key].minimum,
                            max : movieSchema.properties[key].maximum
                        }        

                        return obj;
                        }
            });
    var propsaux = [];
    for(var i = 0;i<props.length;i++){
        if(props[i] !== void 0 && props[i].name.substr(props[i].name.length - 2) !== "id"){
            propsaux.push(props[i]);
        }
    }

    res.render('form1', {
            title: 'Movie',
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            properties: propsaux            
    });
});

/**
 * Rota que faz render do ficheiro form2.mustache que consite no fomulario de editar um elemento
 * to tipo Movie
 *
 */
backofficeRouter.get('/Movie/Editar/:id',function(req,res) {
    movie.get(req.params.id,function (row) {
        var element = row[0];
    var props =  Object.getOwnPropertyNames(new movie()).map(key => {
                        if(Object.keys(movieSchema.properties).includes(key)){
                        var typeAux = movieSchema.properties[key].type;
                        if(typeAux === 'integer'){
                            typeAux = 'number';
                        }else if(typeAux === 'string')typeAux = 'text';
                        var obj = {
                            name: capitalizeFirstLetter(key),
                            val : element[key],
                            required : movieSchema.required.includes(key),
                            type: typeAux
                        }        

                        return obj;
                        }
            });
    var propsaux = [];
    for(var i = 0;i<props.length;i++){
        if(props[i] !== void 0 && props[i].name.substr(props[i].name.length - 2) !== "id"){
            propsaux.push(props[i]);
        }
    }

    res.render('form2', {
            title: 'Movie',
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            idClass: req.params.id,
            properties: propsaux
            }
        )
    });
});

/************************************************************************************************************************************/
/*************************************************** Place **********************************************************/
/************************************************************************************************************************************/

var place = require('../Models/Place.js');
var placeSchema = require('../Models/Place-schema.js');

/**
 * Rota que faz render do ficheiro list.mustache com a informação devolvida pela função
 * all da classe Place
 *
 */
backofficeRouter.get('/Place',function(req,res) {    
    place.all(function (rows) {
        res.render('list', {
            title: 'Place',
            cssPath: [
                { css: "../css/default.css"},
                { css: "../css/nav.css"},
                { css: "../css/all.css"},
                { css: "../css/tops.css"}
            ],
            rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Place/Detalhe/' + obj.id,
                        image: {
                            src: '../Images/read.png'
                        },
                        tooltip: 'Ver Detalhes'
                    }, {
                        label: '',
                        link: './Place/Editar/' + obj.id,
                        image: {
                            src: '../Images/edit.png'
                        },
                        tooltip: 'Editar'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../Images/delete.png'
                        },
                        tooltip: 'Apagar',
                        events: [{
                            name: "onclick",
                            function: "apagar",
                            args: obj.id
                        }]

                    }]
                }
            }),
            columns: Object.keys(new place()).map(key => {
                return {
                    name: capitalizeFirstLetter(key)
                };
            }),
            insert: true
        });
    });
});

/**
 * Rota que faz render do ficheiro details.mustache com a informação devolvida pela função
 * get da classe Place
 *
 */
backofficeRouter.get('/Place/Detalhe/:id', function (req, res) {
    place.get(req.params.id, function (row) {
        res.render('details', {
            properties: function () {
                var element = row[0];
                var allProps = Object.getOwnPropertyNames(element);
                var validProps = [];
                allProps.forEach(function (prop) {
                    if (placeSchema.properties.hasOwnProperty(prop)) {
                        if(prop.toString() != "image"){
                            validProps.push({
                                name: capitalizeFirstLetter(prop),
                                value: element[prop]
                            });
                        }
                    }
                });
                return validProps;
            },
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            imagePath: "../../../" + row[0].image,
            title: "Place"
        });
    });
});

/**
 * Rota que faz render do ficheiro form1.mustache que consite no fomulario de inserção de um elemento
 * to tipo Place
 *
 */
backofficeRouter.get('/Place/Inserir',function(req,res) {
   var props =  Object.getOwnPropertyNames(new place()).map(key => {
                        if(Object.keys(placeSchema.properties).includes(key)){
                        var typeAux = placeSchema.properties[key].type;
                        if(typeAux === 'integer'){
                            typeAux = 'number';
                        }else if(typeAux === 'string')typeAux = 'text';
                        var obj = {
                            name: capitalizeFirstLetter(key),
                            required : placeSchema.required.includes(key),
                            type: typeAux,
                            min : placeSchema.properties[key].minimum,
                            max : placeSchema.properties[key].maximum
                        }        

                        return obj;
                        }
            });
    var propsaux = [];
    for(var i = 0;i<props.length;i++){
        if(props[i] !== void 0 && props[i].name.substr(props[i].name.length - 2) !== "id"){
            propsaux.push(props[i]);
        }
    }

    res.render('form1', {
            title: 'Place',
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            properties: propsaux            
    });
});

/**
 * Rota que faz render do ficheiro form2.mustache que consite no fomulario de editar um elemento
 * to tipo Place
 *
 */
backofficeRouter.get('/Place/Editar/:id',function(req,res) {
    place.get(req.params.id,function (row) {
        var element = row[0];
    var props =  Object.getOwnPropertyNames(new place()).map(key => {
                        if(Object.keys(placeSchema.properties).includes(key)){
                        var typeAux = placeSchema.properties[key].type;
                        if(typeAux === 'integer'){
                            typeAux = 'number';
                        }else if(typeAux === 'string')typeAux = 'text';
                        var obj = {
                            name: capitalizeFirstLetter(key),
                            val : element[key],
                            required : placeSchema.required.includes(key),
                            type: typeAux
                        }        

                        return obj;
                        }
            });
    var propsaux = [];
    for(var i = 0;i<props.length;i++){
        if(props[i] !== void 0 && props[i].name.substr(props[i].name.length - 2) !== "id"){
            propsaux.push(props[i]);
        }
    }

    res.render('form2', {
            title: 'Place',
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            idClass: req.params.id,
            properties: propsaux
            }
        )
    });
});

/************************************************************************************************************************************/
/*************************************************** Room **********************************************************/
/************************************************************************************************************************************/

var room = require('../Models/Room.js');
var roomSchema = require('../Models/Room-schema.js');

/**
 * Rota que faz render do ficheiro list.mustache com a informação devolvida pela função
 * all da classe Room
 *
 */
backofficeRouter.get('/Room',function(req,res) {    
    room.all(function (rows) {
        res.render('list', {
            title: 'Room',
            cssPath: [
                { css: "../css/default.css"},
                { css: "../css/nav.css"},
                { css: "../css/all.css"},
                { css: "../css/tops.css"}
            ],
            rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Room/Detalhe/' + obj.id,
                        image: {
                            src: '../Images/read.png'
                        },
                        tooltip: 'Ver Detalhes'
                    }, {
                        label: '',
                        link: './Room/Editar/' + obj.id,
                        image: {
                            src: '../Images/edit.png'
                        },
                        tooltip: 'Editar'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../Images/delete.png'
                        },
                        tooltip: 'Apagar',
                        events: [{
                            name: "onclick",
                            function: "apagar",
                            args: obj.id
                        }]

                    }]
                }
            }),
            columns: Object.keys(new room()).map(key => {
                return {
                    name: capitalizeFirstLetter(key)
                };
            }),
            insert: true
        });
    });
});

/**
 * Rota que faz render do ficheiro details.mustache com a informação devolvida pela função
 * get da classe Room
 *
 */
backofficeRouter.get('/Room/Detalhe/:id', function (req, res) {
    room.get(req.params.id, function (row) {
        res.render('details', {
            properties: function () {
                var element = row[0];
                var allProps = Object.getOwnPropertyNames(element);
                var validProps = [];
                allProps.forEach(function (prop) {
                    if (roomSchema.properties.hasOwnProperty(prop)) {
                        if(prop.toString() != "image"){
                            validProps.push({
                                name: capitalizeFirstLetter(prop),
                                value: element[prop]
                            });
                        }
                    }
                });
                return validProps;
            },
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            imagePath: "../../../" + row[0].image,
            title: "Room"
        });
    });
});

/**
 * Rota que faz render do ficheiro form1.mustache que consite no fomulario de inserção de um elemento
 * to tipo Room
 *
 */
backofficeRouter.get('/Room/Inserir',function(req,res) {
   var props =  Object.getOwnPropertyNames(new room()).map(key => {
                        if(Object.keys(roomSchema.properties).includes(key)){
                        var typeAux = roomSchema.properties[key].type;
                        if(typeAux === 'integer'){
                            typeAux = 'number';
                        }else if(typeAux === 'string')typeAux = 'text';
                        var obj = {
                            name: capitalizeFirstLetter(key),
                            required : roomSchema.required.includes(key),
                            type: typeAux,
                            min : roomSchema.properties[key].minimum,
                            max : roomSchema.properties[key].maximum
                        }        

                        return obj;
                        }
            });
    var propsaux = [];
    for(var i = 0;i<props.length;i++){
        if(props[i] !== void 0 && props[i].name.substr(props[i].name.length - 2) !== "id"){
            propsaux.push(props[i]);
        }
    }

    res.render('form1', {
            title: 'Room',
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            properties: propsaux            
    });
});

/**
 * Rota que faz render do ficheiro form2.mustache que consite no fomulario de editar um elemento
 * to tipo Room
 *
 */
backofficeRouter.get('/Room/Editar/:id',function(req,res) {
    room.get(req.params.id,function (row) {
        var element = row[0];
    var props =  Object.getOwnPropertyNames(new room()).map(key => {
                        if(Object.keys(roomSchema.properties).includes(key)){
                        var typeAux = roomSchema.properties[key].type;
                        if(typeAux === 'integer'){
                            typeAux = 'number';
                        }else if(typeAux === 'string')typeAux = 'text';
                        var obj = {
                            name: capitalizeFirstLetter(key),
                            val : element[key],
                            required : roomSchema.required.includes(key),
                            type: typeAux
                        }        

                        return obj;
                        }
            });
    var propsaux = [];
    for(var i = 0;i<props.length;i++){
        if(props[i] !== void 0 && props[i].name.substr(props[i].name.length - 2) !== "id"){
            propsaux.push(props[i]);
        }
    }

    res.render('form2', {
            title: 'Room',
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            idClass: req.params.id,
            properties: propsaux
            }
        )
    });
});

/************************************************************************************************************************************/
/*************************************************** Ticket **********************************************************/
/************************************************************************************************************************************/

var ticket = require('../Models/Ticket.js');
var ticketSchema = require('../Models/Ticket-schema.js');

/**
 * Rota que faz render do ficheiro list.mustache com a informação devolvida pela função
 * all da classe Ticket
 *
 */
backofficeRouter.get('/Ticket',function(req,res) {    
    ticket.all(function (rows) {
        res.render('list', {
            title: 'Ticket',
            cssPath: [
                { css: "../css/default.css"},
                { css: "../css/nav.css"},
                { css: "../css/all.css"},
                { css: "../css/tops.css"}
            ],
            rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Ticket/Detalhe/' + obj.id,
                        image: {
                            src: '../Images/read.png'
                        },
                        tooltip: 'Ver Detalhes'
                    }, {
                        label: '',
                        link: './Ticket/Editar/' + obj.id,
                        image: {
                            src: '../Images/edit.png'
                        },
                        tooltip: 'Editar'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../Images/delete.png'
                        },
                        tooltip: 'Apagar',
                        events: [{
                            name: "onclick",
                            function: "apagar",
                            args: obj.id
                        }]

                    }]
                }
            }),
            columns: Object.keys(new ticket()).map(key => {
                return {
                    name: capitalizeFirstLetter(key)
                };
            }),
            insert: true
        });
    });
});

/**
 * Rota que faz render do ficheiro details.mustache com a informação devolvida pela função
 * get da classe Ticket
 *
 */
backofficeRouter.get('/Ticket/Detalhe/:id', function (req, res) {
    ticket.get(req.params.id, function (row) {
        res.render('details', {
            properties: function () {
                var element = row[0];
                var allProps = Object.getOwnPropertyNames(element);
                var validProps = [];
                allProps.forEach(function (prop) {
                    if (ticketSchema.properties.hasOwnProperty(prop)) {
                        if(prop.toString() != "image"){
                            validProps.push({
                                name: capitalizeFirstLetter(prop),
                                value: element[prop]
                            });
                        }
                    }
                });
                return validProps;
            },
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            imagePath: "../../../" + row[0].image,
            title: "Ticket"
        });
    });
});

/**
 * Rota que faz render do ficheiro form1.mustache que consite no fomulario de inserção de um elemento
 * to tipo Ticket
 *
 */
backofficeRouter.get('/Ticket/Inserir',function(req,res) {
   var props =  Object.getOwnPropertyNames(new ticket()).map(key => {
                        if(Object.keys(ticketSchema.properties).includes(key)){
                        var typeAux = ticketSchema.properties[key].type;
                        if(typeAux === 'integer'){
                            typeAux = 'number';
                        }else if(typeAux === 'string')typeAux = 'text';
                        var obj = {
                            name: capitalizeFirstLetter(key),
                            required : ticketSchema.required.includes(key),
                            type: typeAux,
                            min : ticketSchema.properties[key].minimum,
                            max : ticketSchema.properties[key].maximum
                        }        

                        return obj;
                        }
            });
    var propsaux = [];
    for(var i = 0;i<props.length;i++){
        if(props[i] !== void 0 && props[i].name.substr(props[i].name.length - 2) !== "id"){
            propsaux.push(props[i]);
        }
    }

    res.render('form1', {
            title: 'Ticket',
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            properties: propsaux            
    });
});

/**
 * Rota que faz render do ficheiro form2.mustache que consite no fomulario de editar um elemento
 * to tipo Ticket
 *
 */
backofficeRouter.get('/Ticket/Editar/:id',function(req,res) {
    ticket.get(req.params.id,function (row) {
        var element = row[0];
    var props =  Object.getOwnPropertyNames(new ticket()).map(key => {
                        if(Object.keys(ticketSchema.properties).includes(key)){
                        var typeAux = ticketSchema.properties[key].type;
                        if(typeAux === 'integer'){
                            typeAux = 'number';
                        }else if(typeAux === 'string')typeAux = 'text';
                        var obj = {
                            name: capitalizeFirstLetter(key),
                            val : element[key],
                            required : ticketSchema.required.includes(key),
                            type: typeAux
                        }        

                        return obj;
                        }
            });
    var propsaux = [];
    for(var i = 0;i<props.length;i++){
        if(props[i] !== void 0 && props[i].name.substr(props[i].name.length - 2) !== "id"){
            propsaux.push(props[i]);
        }
    }

    res.render('form2', {
            title: 'Ticket',
            cssPath: [
                { css: "../../../css/default.css"},
                { css: "../../../css/nav.css"},
                { css: "../../../css/all.css"},
                { css: "../../../css/tops.css"}
            ],
            idClass: req.params.id,
            properties: propsaux
            }
        )
    });
});


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = backofficeRouter;
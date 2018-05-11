// Importing Dependencies Module
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Router = express.Router();

// Importing Routes Module
const routes = require('./routes/index');


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT


// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));


// VIEW ENGINE
app.set('view engine', 'html');
app.engine('html', (path, options, callbacks) => {
    fs.readFile(path, 'utf-8', callback);
});

// MIDDLEWARE
app.use(express.static('dist'));

// // TODO APP ROUTE
app.use('/', routes);

app.use('/todos', Router);


// TODOs API ROUTES
// config files
var DB = require('./config/db');
var Todos = require('./models/todo');
var ObjectID = require('mongodb').ObjectID;

// Connect to mongo DB
MongoClient.connect(DB.url, function (err, client) {
    if (err) throw err
    var db = client.db('TodoApp');

    // To be in crud : API Routes
    // CREATE 
    app.post('/', (req, res) => {
        var formtodo = {
            todoBody:{
            title: req.body.todoBody.title,
            description: req.body.todoBody.description,
            dateCreated: req.body.todoBody.dateCreated,
            datetodo: req.body.todoBody.datetodo,
            completed: req.body.todoBody.completed
            }
        };

        var newtodo = new Todos(formtodo);
        db.collection('todos').insertOne(newtodo, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(newtodo);
            }
        });
     }); //post ends

    // READ one
    app.get('/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('todos').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });  //read ends

    // READ All from Collections
    Router.get('/', (req, res) => {
        db.collection('todos').find({}).toArray((err, items) => {
            res.send(items);
        });
    });  //read ends

    // UPDATE 
    app.put('/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': ObjectID(id) };
        var formtodo = {
            todoBody:{
                title: req.body.todoBody.title,
                description: req.body.todoBody.description,
                datetodo: req.body.todoBody.datetodo,
                dateCreated: req.body.todoBody.dateCreated,
                completed: req.body.todoBody.completed
            }
        };
        db.collection('todos').update(details, { $set: 
                        { "todoBody.title": req.body.todoBody.title,
                          "todoBody.description": req.body.todoBody.description,
                          "todoBody.datetodo": req.body.todoBody.datetodo
                        }
            }, (err, result) => {
            if (err) {
                res.send({ err });
            } else {
                res.send(formtodo);
            }
        });
    });  //update ends 

    //  Task completed UPDATE
    app.put('/:id/:completed', (req, res) => {
        const id = req.params.id;
        const details = { '_id': ObjectID(id) };
        var x = { $set: { "todoBody.completed" : true } } 
        db.collection('todos').update(details, x, (err, result) => {
            if (err) {
                res.send({ err });
            } else {
                res.send(x);
            }
        });
    });  //Task completed update ends

    // DELETE 
    app.delete('/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('todos').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Todo ' + id + ' deleted!');
            }
        });
    });  //delete ends   
});


module.exports = app;


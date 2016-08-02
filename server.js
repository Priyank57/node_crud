/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//console.log("Hello World.");
__dirname = '/opt/lampp/htdocs/node_3';

express = require('express');

bodyParser = require('body-parser');

app = express();
app.use(bodyParser.urlencoded({extended: true}));

MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');
var db;
MongoClient.connect('mongodb://root:root@ds023245.mlab.com:23245/star-wars-quotes', function (err, database) {
    if (err)
        return console.log(err);
    db = database;
    app.listen(3000, function () {
        console.log('listening on 3000');
    });
});
//app.get('/', function (req, res) {
////    res.send('Hello World,I m Here.')
//    var cursor = db.collection('quotes').find();
//    res.sendFile(__dirname + '/index.html');
//});
app.get('/', function (req, res) {
    db.collection('quotes').find().toArray(function (err, result) {
        if (err)
            return console.log(err);
        // renders index.ejs
        res.render('index.ejs', {quotes: result});
    });
});

app.post('/quotes', function (req, res) {
    db.collection('quotes').save(req.body, function (err, result) {
        if (err)
            return console.log(err);
        console.log('saved to database');
        res.redirect('/');
    })
})

//app.listen(3000, function () {
//    console.log('listening on 3000')
//});
//

//
//app.post('/quotes', function (req, res) {
//    console.log(req.body);
//});
//
//
////Mongo Client
//MongoClient.connect('link-to-mongodb', function(err, database){
//    // ... start the server
//});

//app.get('/', function (req, res) {
//    res.send('Hello World,I m Here.')
//})

//ES6 Code
//app.get('/', (req, res) = > {
//    res.send('hello world')
//})
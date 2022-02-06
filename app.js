//server.js Saqib Hasan Siddiqi / 301237796 / 5th febuary 2022
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/about-me', function(req, res) {
    res.render('pages/about-me');
});

app.get('/projects', function(req, res) {
    res.render('pages/projects');
});

app.get('/services', function(req, res) {
    res.render('pages/services');
});

app.get('/contact', function(req, res) {
    res.render('pages/contact');
});

app.listen(8888);
console.log('Server is listening on port 8888');
//server.js Saqib Hasan Siddiqi / 301237796 / 5th febuary 2022
var express = require('express');
var app = express();
//auth
let session = require('express-session');
let passport = require('passport');

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;

let flash = require('connect-flash');
const serveIndex = require('serve-index');

//expression session
app.use(session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false
}));

//init flash
app.use(flash);

//init passport
app.use(passport.initialize());
app.use(passport.session());

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

app.get('/bussiness-contact', function(req, res){

});
app.get('/login', function(req, res){

});




app.listen(3000);
console.log('Server is listening on port 3000');
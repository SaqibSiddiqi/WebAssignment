//server.js Saqib Hasan Siddiqi / 301237796 / 5th febuary 2022
let express = require('express');
let app = express();
let createError = require('http-errors');
let path = require('path')
let cookieParser = require('cookie-parser'); 
let logger = require('morgan');
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

let userModel = require('./src/model/user');
let User = userModel.User;

passport.use(User.createStrategy());

//serializer and Deserializer
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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


//Login Functions
app.get('/login', function(req, res){
    if(!req.user){
        res.render('auth/login',{
            title:"Login", messages :req.flash('loginMessege'), displayName : req.user? req.user.displayName:""
        });
    }else{
        return res.redirect('/');
        
    }
});
app.post('/login', function(req, res){
    passport.authenticate('local', (err, usr, info) =>{
        if(err){
            return next(err);
        }
        if(!user){
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err)=>{
            if(err){
                return next(err);
            }
            const payload = {
                id: user._id,
                displayName : user.displayName,
                username : user.username,
                email : user.email
            }
            return res.redirect('/business-contact');
        });
    });
});


//Register Functions
app.get('/register', function(req, res){
    if(!req.user){
        res.render('auth/register',{
            title:"Register", 
            messages :req.flash('registerMessege'), 
            displayName : req.user? req.user.displayName:""
        });
    }else{
        return res.redirect('/');
    }
});

app.post('/register', function(req, res){

    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err)=>{
        if(err){
            console.log("Error registering new user");
            if(err.name = "UserExistsError"){
                req.flash(
                    'regiserMessege', 'Registration Error: User Already Exists'
                );
                console.log('Error: User already Exists');
            }
            return res.render('auth/register', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user? req.user.displayName: ""
            });
        }else{
            return passport.authenticate('local')(req, res, ()=>{
                res.redirect('/bussiness-contact');
            })
        }
    });
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});




app.listen(3000);
console.log('Server is listening on port 3000');
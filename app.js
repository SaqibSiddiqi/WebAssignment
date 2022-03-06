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

let contactModel = require('./src/model/contacts');
let Contact = contactModel.Contacts;

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


//Bussiness Contact Auth
function requireAuth(req, res, next){
    if(!req.isAuthenticatied){
        return res.redirect('/login');
    }
    next();
}

app.get('/bussiness-contact', function(req, res){
    res.render('pages/bussiness-contact',{contacts: Contact});
});

//edit functions
app.get('/bussiness-contact/:id',requireAuth, function(req, res){
    let id = req.params.id;
    Contact.findById(id, (err, contactToEdit)=>{
      if(err){
        console.log(err);
        res.end(err);
      }else{
        res.render('auth/details',{title: 'Edit Contact', contacts: contactToEdit})
      }
    })
});
app.post('/bussiness-contact/:id',requireAuth, function(req, res){
    let id = req.params.id;
    let updatedContact = Contact({
    "_id" :id,
    "Name" : req.body.Name,
    "Number" : req.body.Number,
    "Email" : req.body.price
  })

  book.updateOne({_id:id}, updatedContact,(err)=>{
    if(err){
      console.log(err);
      res.end(err);
    }else{
      res.redirect('/bussiness-contact');
    }
  })

});

//delete functions
app.get('/bussiness-contact/delete/:id',requireAuth, function(req, res){
  let id = req.params.id;
  Contact.remove({_id:id}, (err)=>{
    if(err){
      console.log(err);
      res.end(err);
    }else{
      res.redirect('/bussiness-contact');
    }
  })
});


app.listen(3000);
console.log('Server is listening on port 3000');
let mongoose = require('mongoose');

let passportLocalMongoose = require('passport-local-mongoose');

let Contacts = mongoose.Schema({
    name: {
        type : String,
    },
    email : {
        type : String,
    },    
    number:{
        type : Number,
    }
}, {

    collection:"Bussiness Contacts"

});

module.exports.User = mongoose.model('Contacts', Contacts);
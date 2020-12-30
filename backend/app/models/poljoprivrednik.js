var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

var Poljoprivrednik = new Schema({
    ime: {type: String, required: true},
    prezime: {type: String, required: true},
    username: {type: String, lowercase: true, required: true, unique: true},
    password: {type: String, required: true},
    datumRodjenja:{type: Date, required: true},
    mestoRodjenja: {type: String, required: true},
    telefon : {type: Number, required: true},
    email: {type: String, required: true},
    tip: {type: String, default: "1"},
    idPoslednjePorudzbine: {type: Number, default: 0}
});

/*Poljoprivrednik.pre('save', function(next) { //encrypt passwords in database
    
    var user = this;
    bcrypt.hash(user.password, null, null, function(err,hash){
        if(err) return next(err);
        user.password = hash;
        next();
    });
});*/

module.exports = mongoose.model('Poljoprivrednik', Poljoprivrednik);
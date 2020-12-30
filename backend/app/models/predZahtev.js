var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

var PredZahtev = new Schema({
    ime: {type: String, required: true},
    username: {type: String, lowercase: true, required: true, unique: true},
    password: {type: String, required: true},
    datumOsnivanja:{type: Date, required: true},
    mesto: {type: String, required: true},
    email: {type: String, lowercase: true, required: true},
    tip: {type: String, default: "2"}
});

/*PredZahtev.pre('save', function(next) { //encrypt passwords in database
    var user = this;
    bcrypt.hash(user.password, null, null, function(err,hash){
        if(err) return next(err);
        user.password = hash;
        next();
    });
});*/

module.exports = mongoose.model('PredZahtev', PredZahtev);
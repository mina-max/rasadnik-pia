var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

var Admin = new Schema({
    username: {type: String, lowercase: true, required: true, unique: true},
    password: {type: String, required: true},
    tip: {type: String, default: "0"}
});

/*Admin.pre('save', function(next) { //encrypt passwords in database
    
    var user = this;
    bcrypt.hash(user.password, null, null, function(err,hash){
        if(err) return next(err);
        user.password = hash;
        next();
    });
});*/

module.exports = mongoose.model('Admin', Admin);
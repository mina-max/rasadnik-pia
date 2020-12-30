var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

var Komentar = new Schema({
    tekst:{type: String},
    username: {type: String, required: true},
    proizvodId: {type: String, required: true},
    ocena: {type: Number, required: true},
    datum: {type:String}
});

module.exports = mongoose.model('Komentar', Komentar);
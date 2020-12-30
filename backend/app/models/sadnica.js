var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

var Sadnica = new Schema({
    naziv: {type: String, required: true},
    proizvodjac: {type: String, required: true},
    rasadnik: {type: String, required: true},
    rasadnikId: {type: String},
    pozicija: {type: Number, required: true},
    zivotniVek: {type: Number, required: true},
    starost: {type: Number, required: true},
    tip: {type: String, default: "S"}
});

module.exports = mongoose.model('Sadnica', Sadnica);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

var SadnicaMagacin = new Schema({
    naziv: {type: String, required: true},
    proizvodjac: {type: String, required: true},
    rasadnik: {type: String},
    rasadnikId: {type: String},
    zivotniVek: {type: Number, required: true},
    starost: {type: Number, default: 0},
    kolicina: {type: Number, required: true},
    tip: {type: String, default: "S"}
});

module.exports = mongoose.model('SadnicaMagacin', SadnicaMagacin);
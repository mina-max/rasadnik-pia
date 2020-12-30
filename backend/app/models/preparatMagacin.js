var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

var PreparatMagacin = new Schema({
    naziv: {type: String, required: true},
    proizvodjac: {type: String, required: true},
    rasadnik: {type: String},
    rasadnikId: {type: String},
    daniUbrzavanje: {type: Number, required: true},
    kolicina: {type: Number, required: true},
    tip: {type: String, default: "P"}
});

module.exports = mongoose.model('PreparatMagacin', PreparatMagacin);
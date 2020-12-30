var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

var PreparatProdavnica = new Schema({
    naziv: {type: String, required: true},
    proizvodjac: {type: String, required: true},
    rasadnik: {type: String},
    daniUbrzavanje: {type: Number, required: true},
    cena: {type: Number, required: true},
    kolicina: {type:Number},
    stanje: {type: String, default: "Na stanju"},
    prosecnaOcena: {type: Number, default: 0},
    tip: {type: String, default: "P"},
    narucioci: {type: Array, default: []},
    brKomentara: {type: Number, default:0},
    ocenaUkupno: {type: Number, default:0},
});

module.exports = mongoose.model('PreparatProdavnica', PreparatProdavnica);
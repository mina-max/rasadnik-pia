var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

var SadnicaProdavnica = new Schema({
    naziv: {type: String, required: true},
    proizvodjac: {type: String, required: true},
    zivotniVek: {type: Number, required: true},
    cena: {type: Number, required: true},
    kolicina: {type:Number},
    stanje: {type: String, default: "Na stanju"},
    prosecnaOcena: {type: Number, default: 0},
    tip: {type: String, default: "S"},
    narucioci: {type: Array, default: []},
    ocenaUkupno: {type: Number, default:0},
    brKomentara: {type: Number, default:0}
});

module.exports = mongoose.model('SadnicaProdavnica', SadnicaProdavnica);
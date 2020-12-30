var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

var Narudzbina = new Schema({
    idUkupni: {type: Number, required: true},
    artikal: {type: Array, required: true},
    kolicina: {type: Number, required: true},
    proizvodjac: {type: String, required: true},
    narucilac: {type: String, required: true},
    rasadnikId: {type: String, required: true},
    rasadnikMesto: {type: String, required: true},
    datum: {type:Date, required: true},
    status: {type: String, default: "Nije isporučena"}
});

module.exports = mongoose.model('Narudzbina', Narudzbina);
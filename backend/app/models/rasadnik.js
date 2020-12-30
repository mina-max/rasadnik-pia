var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

var Rasadnik = new Schema({
    username: {type: String, lowercase: true, required: true},
    naziv: {type: String, required: true},
    mesto: {type: String, required: true},
    sadnice: {type: Number, required: true},
    slobodnaMesta: {type: Number, required: true},
    voda: {type: Number, required: true},
    temp: {type: Number, required: true},
    sirina: {type: String, required: true},
    duzina: {type: String, required: true},
    pozCekanje: {type: Array},
    obavesten: {type: Boolean, default:false}
});

module.exports = mongoose.model('Rasadnik', Rasadnik);
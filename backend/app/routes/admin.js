const express = require('express');
const router = express.Router();
const Poljoprivrednik = require('../models/poljoprivrednik');
const PoljZahtev = require('../models/poljZahtev');
const Preduzece = require('../models/preduzece');
const PredZahtev = require('../models/predZahtev');
const Rasadnik = require('../models/rasadnik');
const Sadnica = require('../models/sadnica');
const SadnicaProdavnica = require('../models/sadnicaProdavnica');
const PreparatProdavnica = require('../models/preparatProdavnica');

const SadnicaMagacin = require('../models/sadnicaMagacin');
const PreparatMagacin = require('../models/preparatMagacin');

router.post('/poljZahtev', (req, res) => { //dovuci zahteve poljoprivrednika
    PoljZahtev.find((err, data) => {
        if (err) {
            return res.status(400).send(err);
        }
        if (!data) {
            return res.status(201).send(null);
        }
        else {
            return res.status(200).send(data);
        }
    });

})

router.post('/predZahtev', (req, res) => {  //dovuci zahteve preduzeca
    PredZahtev.find((err, data) => {
        if (err) {
            return res.status(400).send(err);
        }
        if (!data) {
            return res.status(201).send(null);
        }
        else {
            return res.status(200).send(data);
        }
    });

})

router.post('/poljKor', (req, res) => { //dovuci poljoprivrednike
    Poljoprivrednik.find((err, data) => {
        if (err) {
            return res.status(400).send(err);
        }
        if (!data) {
            return res.status(201).send(null);
        }
        else {
            return res.status(200).send(data);
        }
    });

})

router.post('/predKor', (req, res) => { //dovuci preduzeca
    Preduzece.find((err, data) => {
        if (err) {
            return res.status(400).send(err);
        }
        if (!data) {
            return res.status(201).send(null);
        }
        else {
            return res.status(200).send(data);
        }
    });

})

router.post('/poljObrisi', (req, res) => { //obrisi zahtev za reg poljopr
    console.log(req.body)
    PoljZahtev.deleteOne({ username: req.body.username }, (err, data) => {
        if (err) {
            return res.status(400).send(err);
        }
        else {
            return res.status(200).send(data);
        }
    });

})

router.post('/predObrisi', (req, res) => { //obrisi zahtev za reg preduzeca
    PredZahtev.deleteOne({ username: req.body.username }, (err, data) => {
        if (err) {
            return res.status(400).send(err);
        }
        else {
            return res.status(200).send(data);
        }
    });

})

router.post('/poljKorObrisi', (req, res) => { //obrisi poljoprivrednika
    Poljoprivrednik.deleteOne({ username: req.body.username }, (err, data) => {
        if (err) {
            return res.status(400).send(err);
        }
        else {
            Rasadnik.deleteMany({username: req.body.username}, (err, data)=>{
            return res.send(data);
            })
            
         }
    });

})

router.post('/predKorObrisi', (req, res) => { //obrisi preduzece
    Preduzece.deleteOne({ username: req.body.username }, (err, data) => {
        console.log(req.body.username);
        if (err) {
            return res.status(400).send(err);
        }
        else {
            SadnicaProdavnica.deleteMany({proizvodjac: req.body.username}, (err,data)=>{
                PreparatProdavnica.deleteMany({proizvodjac: req.body.username}, (err,data)=>{
                  return res.status(200).send(data);   
                })
               
            })
            
        }
    });

})



module.exports = router;
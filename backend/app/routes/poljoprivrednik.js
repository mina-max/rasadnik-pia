const express = require('express');
const router = express.Router();

const Poljoprivrednik = require('../models/poljoprivrednik');
const Rasadnik = require('../models/rasadnik');
const Sadnica = require('../models/sadnica');
const SadnicaMagacin = require('../models/sadnicaMagacin');
const PreparatMagacin = require('../models/preparatMagacin');
const PreparatProdavnica = require('../models/preparatProdavnica');
const SadnicaProdavnica = require('../models/sadnicaProdavnica');
const Narudzbina = require('../models/narudzbina');
const Preduzece = require('../models/preduzece');


router.post('/rasadnici', (req, res) => { //dovuci rasadnike
    Rasadnik.find({ username: req.body.username }, (err, data) => {
        if (err) {
            return res.status(400).send(err);
        }
        if (!data) {
            return res.status(201).send(null);
        }
        else {
            //console.log(data);
            return res.status(200).send(data);
        }
    });
})


router.post('/promenaSifre', (req, res) => {
    Poljoprivrednik.findOne({ username: req.body.username, password: req.body.oldPass }, (err, user) => {
        if (err) return res.status(400).send("Server Error");
        if (!user) {
            Preduzece.findOne({ username: req.body.username, password: req.body.oldPass }, (err, u) => {
                if (err) return res.status(401).send(err);
                u.password = req.body.newPass;
                u.save((err, data) => {
                    if (err) return res.status(400).send("Server Error");
                    else return res.status(200).send(data);
                })
            })
        }
        else {
            user.password = req.body.newPass;
            user.save((err, data) => {
                if (err) return res.status(400).send("Server Error");
                else return res.status(200).send(data);
            })
        }
    })
})

router.post('/sadnice', (req, res) => { //dovuci posadjene sadnice 
    console.log(req.body);
    Sadnica.find({ rasadnikId: req.body._id }, (err, data) => {
        //console.log(data);
        if (err) return res.status(400).send(err);
        if (!data) return res.status(404).send(null);
        else return res.status(200).send(data);
    })
})

router.post('/magacinSadnice', (req, res) => { //dovuci sadnice iz magacina
    console.log(req.body.naziv);
    SadnicaMagacin.find({ rasadnikId: req.body._id }, (err, data) => {
        if (err) return res.status(400).send(err);
        if (!data) return res.status(404).send(null);
        else return res.status(200).send(data);
    })
})

router.post('/magacinPreparati', (req, res) => { //dovuci preparate iz magacina
    PreparatMagacin.find({ rasadnikId: req.body._id }, (err, data) => {
        if (err) return res.status(400).send(err);
        if (!data) return res.status(404).send(null);
        else return res.status(200).send(data);
    })
})

router.post('/dodajRasadnik', (req, res) => { //dodavanje novog rasadnika
    const rasadnik = new Rasadnik({
        username: req.body.username,
        naziv: req.body.naziv,
        mesto: req.body.mesto,
        sadnice: req.body.sadnice,
        slobodnaMesta: req.body.slobodnaMesta,
        voda: req.body.voda,
        temp: req.body.temp,
        sirina: req.body.sirina,
        duzina: req.body.duzina,
        pozCekanje: []
    });
    rasadnik.save((err, data) => {
        if (err) return res.status(400).send(err);
        else return res.status(200).send(data);
    })
})

router.post('/dodajSadnicu', (req, res) => { //dodavanje nove sadnice
    const sadnica = new Sadnica({
        naziv: req.body.naziv,
        pozicija: req.body.pozicija,
        rasadnik: req.body.rasadnik,
        rasadnikId: req.body.rasadnikId,
        proizvodjac: req.body.proizvodjac,
        starost: req.body.starost,
        zivotniVek: req.body.zivotniVek
    });
    //console.log(sadnica);
    sadnica.save((err, data) => {
        if (err) return res.status(401).send(err);
        else {
            SadnicaMagacin.findById(req.body.id, (err, dataMag) => {
                if (err) return res.send(err);
                else {
                    //console.log("mikaaaaaaa");
                    dataMag.kolicina = dataMag.kolicina - 1;
                    //console.log(dataMag.kolicina);
                    if (dataMag.kolicina == 0) {
                        SadnicaMagacin.deleteOne({ _id: dataMag._id }, (err, data) => {
                            if (err) return res.send(err);
                            else {
                                //console.log(data);
                                Rasadnik.findOne({ _id: req.body.rasadnikId }, (err, ras) => {
                                    if (err) return res.send(err);
                                    else {
                                        ras.sadnice = ras.sadnice + 1;
                                        ras.slobodnaMesta = ras.slobodnaMesta - 1;
                                        ras.save((err, dat) => {
                                            if (err) return res.send(err);
                                            else {
                                                dataMag.save((err, sad) => {
                                                    if (err) return res.send(err);
                                                    else return res.send("uspeh");
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        });
                    }
                    else {
                        //console.log("MIRJANA BRE")

                        Rasadnik.findOne({ _id: req.body.rasadnikId }, (err4, ras) => {
                            if (err4)
                                return res.status(403).send(err4);
                            else {
                                console.log(ras);
                                ras.sadnice = ras.sadnice + 1;
                                ras.slobodnaMesta = ras.slobodnaMesta - 1;
                                ras.save((err, dat) => {
                                    if (err) return res.status(402).send(err);
                                    else {
                                        dataMag.save((err5, sad) => {
                                            if (err5) return res.status(444).send(err);
                                            else {
                                                //console.log("uspeh jebeno")
                                                return res.send(sad);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
    })
})

router.post('/promeni', (req, res) => {
    Rasadnik.findById(req.body._id, (err, data) => {
        if (err) return res.status(402).send(err);
        else {
            data.voda = req.body.voda;
            data.temp = req.body.temp;
            data.save((err1, succ) => {
                if (err1) return res.status(401).send(err1);
                else return res.send(succ);
            })
        }
    })
})
/*
router.post('/ostari', (req,res)=>{
    Sadnica.updateMany({}, { $inc: { starost: 1}}, (err, data)=>{
        if(err) {
            console.log(err);
            return res.status(401).send(err);
        }
        else return res.send(data);
    })
})

router.post('/promeniSvima', (req, res)=>{
    Rasadnik.updateMany({}, {$inc: { temp: 0.5, voda: -1}}, (err, data)=>{
        if(err) return res.send(err);
        else return res.send(data);
    })
})*/

router.post('/dodajPreparat', (req, res) => {
    var dani = req.body.preparat.daniUbrzavanje;
    Sadnica.findByIdAndUpdate(req.body.sadnicaZaPreparat._id, { $inc: { starost: dani } }, (err, data) => {
        console.log(data);
        if (err) return res.send(err);
        else {
            if (req.body.preparat.kolicina == 1) {
                PreparatMagacin.findByIdAndDelete(req.body.preparat._id, (err, data) => {
                    if (err) return res.send(err);
                    else return res.send(data);
                })
            }
            else {
                PreparatMagacin.findByIdAndUpdate(req.body.preparat._id, { $inc: { kolicina: -1 } }, (err, data) => {
                    if (err) return res.send(err);
                    else return res.send(data);
                })
            }
        }
    })
})

router.post('/ukloniSadnicu', (req, res) => {
    Sadnica.findByIdAndDelete(req.body._id, (err, data) => {
        Rasadnik.findByIdAndUpdate(req.body.rasadnikId, {$inc:{slobodnaMesta: 1, sadnice: -1}}, (err,data)=>{
           console.log(data);
        if (err) return res.send(err);
        else return res.send(data); 
        });
        
    })
})

router.post('/apdejtujCekanje', (req, res) => {
    Rasadnik.findById(req.body._id, (err, data) => {
        if (err) return err;
        else {
            data.pozCekanje = req.body.pozCekanje;
            const timeout = setTimeout((req, data) => {
                console.log("proslo 10 sek");
                data.pozCekanje.splice(0, 1);
                data.save((err, d) => {
                    if (err) return err;
                    console.log(d)
                }
                );
            }, 24 * 3600000, req, data);
            data.save(/*(err, ras) => {
                if (err) return res.send(err);
                else return res.send(ras);
            }*/)
        }
    })
})

router.post('/dovuciPreparateProdavnica', (req, res) => {
    PreparatProdavnica.find((err, data) => {
        if (err) return res.send(err);
        else return res.send(data);
    })
})

router.post('/dovuciSadniceProdavnica', (req, res) => {
    SadnicaProdavnica.find((err, data) => {
        if (err) return res.send(err);
        else return res.send(data);
    })
})

router.post('/dovuciNarudzbinePreparati', (req, res) => {
    Narudzbina.find({ rasadnikId: req.body._id, "artikal.tip": "P", status: "Nije isporučena" }, (err, data) => {
        console.log(data);
        if (err) return err;
        else return res.send(data);
    })
})

router.post('/dovuciNarudzbineSadnice', (req, res) => {
    Narudzbina.find({ rasadnikId: req.body._id, "artikal.tip": "S", status: "Nije isporučena" }, (err, data) => {
        console.log(data);
        if (err) return err;
        else return res.send(data);
    })
})

router.post('/otkazi', (req, res) => {
    Narudzbina.findByIdAndDelete(req.body._id, (err, data) => {
        
        if (req.body.artikal[0].tip == 'S') {
            SadnicaProdavnica.findById(req.body.artikal[0]._id, (err, data) => {
                console.log(data);
                data.kolicina = data.kolicina + req.body.kolicina;
                data.status = "Na stanju";
                data.save((err, d) => {
                    console.log(d);
                    if (err) return res.send(err);
                    else return res.send(d);
                })
            })

        } else {
            PreparatProdavnica.findById(req.body.artikal[0]._id, (err, data) => {
                data.kolicina = data.kolicina + req.body.kolicina;
                data.status = "Na stanju";
                data.save((err, d) => {
                    console.log(d);
                    if (err) return res.send(err);
                    else return res.send(d);
                })
            })
        }

    })
})


module.exports = router;

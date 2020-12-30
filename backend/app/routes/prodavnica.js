const express = require('express');
const router = express.Router();

const Poljoprivrednik = require('../models/poljoprivrednik');
const Preduzece = require('../models/preduzece');
const Rasadnik = require('../models/rasadnik');
const Sadnica = require('../models/sadnica');
const SadnicaMagacin = require('../models/sadnicaMagacin');
const PreparatMagacin = require('../models/preparatMagacin');
const PreparatProdavnica = require('../models/preparatProdavnica');
const SadnicaProdavnica = require('../models/sadnicaProdavnica');
const Komentar = require('../models/komentar');
const Narudzbina = require('../models/narudzbina');


router.post('/dovuciPreparate', (req, res) => {
    PreparatProdavnica.find((err, data) => {
        if (err) return res.send(err);
        else return res.send(data);
    })
})

router.post('/dovuciSadnice', (req, res) => {
    SadnicaProdavnica.find((err, data) => {
        if (err) return res.send(err);
        else return res.send(data);
    })
})

router.post('/dovuciKomentare', (req, res) => {
    Komentar.find({ proizvodId: req.body._id }, (err, data) => {
        if (err) return res.send(err);
        else return res.send(data);
    })
})

router.post('/dodajKomentar', (req, res) => {
    if (req.body.tip == 'S') {
        SadnicaProdavnica.findById(req.body.proizvodId, (err, data) => {
            data.brKomentara = data.brKomentara + 1;
            data.ocenaUkupno = data.ocenaUkupno + req.body.ocena;
            data.prosecnaOcena = (data.ocenaUkupno / data.brKomentara).toFixed(2);
            data.save((err, d) => {
                const kom = new Komentar({
                    tekst: req.body.tekst,
                    username: req.body.username,
                    proizvodId: req.body.proizvodId,
                    ocena: req.body.ocena,
                    datum: req.body.datum
                });
                kom.save();
                return res.send(d);
            });

        })

    } else {
        PreparatProdavnica.findById(req.body.proizvodId, (err, data) => {
            data.brKomentara = data.brKomentara + 1;
            data.ocenaUkupno = data.ocenaUkupno + req.body.ocena;
            data.prosecnaOcena = (data.ocenaUkupno / data.brKomentara).toFixed(2);
            data.save((err, d) => {
                const kom = new Komentar({
                    tekst: req.body.tekst,
                    username: req.body.username,
                    proizvodId: req.body.proizvodId,
                    ocena: req.body.ocena,
                    datum: req.body.datum
                });
                kom.save();
                return res.send(d);
            });

        })

    }
})

router.post('/naruci', (req, res) => {
    var k = req.body.kolicina;
    var kol = 0;
    if (req.body.artikal.tip == 'S') {
        SadnicaProdavnica.findById(req.body.artikal._id, (err, data) => {
            kol = data.kolicina;
            data.kolicina = data.kolicina - req.body.kolicina;
            if (data.kolicina <= 0) {
                k = kol;
                console.log(k)
                data.kolicina = 0;
                data.stanje = "Nema";
            }
            data.save();
            const narudzbina = new Narudzbina({
                idUkupni: req.body.idUkupni,
                artikal: req.body.artikal,
                kolicina: k,
                proizvodjac: req.body.proizvodjac,
                rasadnikId: req.body.rasadnikId,
                rasadnikMesto: req.body.rasadnikMesto,
                narucilac: req.body.narucilac,
                datum: req.body.datum
            });
            console.log(narudzbina);
            narudzbina.save((err, data) => {
                if (err) return res.send(err);
                else return res.send(data);
            })
        })
    } else {
        PreparatProdavnica.findById(req.body.artikal._id, (err, data) => {
            kol = data.kolicina;
            data.kolicina = data.kolicina - req.body.kolicina;
            if (data.kolicina <= 0) {
                k = kol;
                console.log(k)
                data.kolicina = 0;
                data.stanje = "Nema";
            }
            data.save();
            const narudzbina = new Narudzbina({
                idUkupni: req.body.idUkupni,
                artikal: req.body.artikal,
                kolicina: k,
                proizvodjac: req.body.proizvodjac,
                rasadnikId: req.body.rasadnikId,
                rasadnikMesto: req.body.rasadnikMesto,
                narucilac: req.body.narucilac,
                datum: req.body.datum
            });
            console.log(narudzbina);
            narudzbina.save((err, data) => {
                if (err) return res.send(err);
                else return res.send(data);
            })
        })
    }

})

router.post('/dovuciNarudzbine', (req, res) => {
    Narudzbina.find({ proizvodjac: req.body.username }, (err, data) => {
        console.log(req.body.username);
        console.log(data);
        if (err) return res.send(err);
        else return res.send(data);
    })
})

router.post('/odbijNarudzbinu', (req, res) => {
    console.log(req.body.proizvodi[0].proizvod[0]._id);
    req.body.proizvodi.forEach(p=>{
        var id = p.proizvod[0]._id;
        if(p.proizvod[0].tip == 'S'){
            SadnicaProdavnica.findByIdAndUpdate(id, { $inc: { kolicina: p.kolicina } }, (err,data)=>{

            });
        } else{
            PreparatProdavnica.findByIdAndUpdate(id, { $inc: { kolicina: p.kolicina } }, (err,data)=>{

            });
        }
    })
    Narudzbina.deleteMany({ narucilac: req.body.narucilac, idUkupni: req.body.idUkupni }, (err, data) => {
        
        if (err) return res.send(err);
        else return res.send(data);
    })
})

router.post('/mestoPreduzeca', (req, res) => {
    Preduzece.findOne({ username: req.body.username }, (err, data) => {
        console.log(data);
        if (err) return res.send(err);
        else return res.send(data);
    })
})

router.post('/promeniKurire', (req, res) => {
    Preduzece.findOneAndUpdate({ username: req.body.user.username }, { $inc: { kuriri: -1 } }, (err, data) => {
        
    })
})

router.post('/promeniStatus', (req, res) => {
    console.log(req.body);
    Narudzbina.find({proizvodjac:req.body.proizvodjac, narucilac: req.body.narucilac, idUkupni: req.body.idUkupni }, (err, data) => {
        console.log(data);
        data.forEach(el => {
            el.status = req.body.status;
            el.save();
        })
        return res.send(data);
    })
})

router.post('/promeniStatusUToku', (req, res) => {
    Narudzbina.find({proizvodjac:req.body.narudzbina.proizvodjac, narucilac: req.body.narudzbina.narucilac,  idUkupni: req.body.narudzbina.idUkupni }, (err, data) => {
        console.log(req.body);

        data.forEach(el => {
            el.status = req.body.status;
            el.save();
        })
    })
    const timeout = setTimeout((req) => {
        Narudzbina.find({proizvodjac:req.body.narudzbina.proizvodjac, narucilac: req.body.narudzbina.narucilac, idUkupni: req.body.narudzbina.idUkupni }, (err, data) => {

            console.log("mika car")
            console.log("isporucio");
            data.forEach(el => {
                el.status = "Isporučena";
                el.save();
            })
            Preduzece.findOneAndUpdate({ username: req.body.narudzbina.proizvodjac }, { $inc: { kuriri: 1 } }, (err, data) => {
                console.log(data);
                req.body.narudzbina.proizvodi.forEach(p => {
                    console.log(p)
                    if (p.proizvod[0].tip == 'S') {
                        SadnicaMagacin.findOne({ naziv: p.proizvod[0].naziv, proizvodjac: p.proizvod[0].proizvodjac, rasadnikId: req.body.narudzbina.rasadnikId }, (err, data) => {
                            if (!data) {
                                console.log(p.proizvod[0])
                                p.proizvod[0].narucioci.push(req.body.narudzbina.narucilac);
                                SadnicaProdavnica.findById(p.proizvod[0]._id, (err, d) => {
                                    d.narucioci.push(req.body.narudzbina.narucilac);
                                    d.save();
                                    const sadnica = new SadnicaMagacin({
                                        naziv: p.proizvod[0].naziv,
                                        proizvodjac: p.proizvod[0].proizvodjac,
                                        rasadnikId: req.body.narudzbina.rasadnikId,
                                        zivotniVek: p.proizvod[0].zivotniVek,
                                        starost: p.proizvod[0].starost,
                                        kolicina: p.kolicina
                                    });
                                    sadnica.save();

                                })

                            }
                            else {
                                data.kolicina = data.kolicina + p.kolicina;
                                data.save();
                            }
                        })

                    } else {
                        PreparatMagacin.findOne({ naziv: p.proizvod[0].naziv, proizvodjac: p.proizvod[0].proizvodjac, rasadnikId: req.body.narudzbina.rasadnikId }, (err, data) => {
                            if (!data) {
                                console.log("nije nasao");
                                PreparatProdavnica.findById(p.proizvod[0]._id, (err, d) => {
                                    console.log(d);
                                    d.narucioci.push(req.body.narudzbina.narucilac);
                                    d.save();
                                    const preparat = new PreparatMagacin({
                                        naziv: p.proizvod[0].naziv,
                                        proizvodjac: p.proizvod[0].proizvodjac,
                                        rasadnikId: req.body.narudzbina.rasadnikId,
                                        daniUbrzavanje: p.proizvod[0].daniUbrzavanje,
                                        kolicina: p.kolicina
                                    })
                                    console.log(preparat);
                                    preparat.save();
                                })
                            }
                            else {
                                data.kolicina = data.kolicina + p.kolicina;
                                data.save();
                            }
                        })

                    }
                })
            });


        });


    }, req.body.time * 1000, req);
    return res.send();
})





/*router.post('/promeniStatusIsporucena', (req, res)=>{
    Narudzbina.find({narucilac: req.body.narudzbina.narucilac, idUkupni: req.body.idUkupni}, (err,data)=>{
            console.log(data);
            data.forEach(el=>{
                if((el.status = "Nije isporučena" && req.body.status == "Isporuka u toku")
                || (el.status = "Isporuka u toku" && req.body.status == "Isporučena")) {
                el.status = req.body.status;
                el.save();
                }
            })
        })
})*/

router.post('/dovuciIdPoslednjePorudzbine', (req, res) => {
    Poljoprivrednik.findOne({ username: req.body.username }, (err, data) => {
        if (err) return res.send(err);
        else return res.send(data);
    })
})

router.post('/promeniIdPoslednjePorudzbine', (req, res) => {
    Poljoprivrednik.findOneAndUpdate({ username: req.body.user.username },
        { idPoslednjePorudzbine: req.body.idPoslednjePorudzbine }, (err, data) => {
            console.log(data);
            if (err) return res.send(err);
            else return res.send(data);
        })
})


router.post('/dovuciSadnicePreduzece', (req, res) => {
    console.log(req.body.username);
    SadnicaProdavnica.find({ proizvodjac: req.body.username }, (err, data) => {
        if (err) return res.send(err);
        else return res.send(data);
    })
})

router.post('/dovuciPreparatePreduzece', (req, res) => {
    PreparatProdavnica.find({ proizvodjac: req.body.username }, (err, data) => {
        if (err) return res.send(err);
        else return res.send(data);
    })
})

router.post('/dodajUProdavnicu', (req, res) => {
    if (req.body.tip == 'S') {
        SadnicaProdavnica.findOne({ naziv: req.body.naziv, proizvodjac:req.body.proizvodjac }, (err, data) => {
            if (!data) {
                const sadnica = new SadnicaProdavnica({
                    naziv: req.body.naziv,
                    proizvodjac: req.body.proizvodjac,
                    zivotniVek: req.body.zivotniVek,
                    kolicina: req.body.kolicina,
                    cena: req.body.cena,
                });
                console.log(sadnica);
                sadnica.save((err, data) => {
                    return res.send(data);
                });
            }
            else {
                data.stanje = "Na stanju"
                data.kolicina = data.kolicina + req.body.kolicina;
                data.cena = req.body.cena
                data.save((err, d) => {
                    return res.send(d);
                });
            }
        })
    } else {
        PreparatProdavnica.findOne({ naziv: req.body.naziv, proizvodjac:req.body.proizvodjac }, (err, data) => {
            if (!data) {
                const preparat = new PreparatProdavnica({
                    naziv: req.body.naziv,
                    proizvodjac: req.body.proizvodjac,
                    daniUbrzavanje: req.body.daniUbrzavanje,
                    kolicina: req.body.kolicina,
                    cena: req.body.cena,
                });
                preparat.save((err, d) => {
                    return res.send(d);
                });
            }
            else {
                data.stanje = "Na stanju"
                data.kolicina = data.kolicina + req.body.kolicina;
                data.cena = req.body.cena
                data.save((err, d) => {
                    return res.send(d);
                })
            }
        })
    }
})

router.post('/povuciProizvod',(req,res)=>{
    if(req.body.tip == "S") {
        SadnicaProdavnica.findByIdAndDelete(req.body._id, (err, data)=>{
            //return res.send(data);
        })
    } else {
        PreparatProdavnica.findByIdAndDelete(req.body._id, (err, data)=>{
            //return res.send(data);
        })
    }
})


module.exports = router;
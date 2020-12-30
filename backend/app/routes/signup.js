const express = require('express');
const router = express.Router();
const Poljoprivrednik = require('../models/poljoprivrednik');
const PoljZahtev = require('../models/poljZahtev');
const Preduzece = require('../models/preduzece');
const PredZahtev = require('../models/predZahtev');

router.post('/poljZahtev', (req, res) => { //zahtev koji salje korisnik
    PredZahtev.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            return res.stutus(401).send("Korisnicko ime je zauzeto");
        }
        if (!user) {
            Preduzece.findOne({ username: req.body.username }, (err1, user1) => {
                if (err1) {
                    return res.send(err1);
                }
                if (!user1) {
                    Poljoprivrednik.findOne({ username: req.body.username }, (err2, user2) => {
                        if (err2) {
                            return res.send(err2)
                        }
                        if (!user2) {
                            const polj = new PoljZahtev({
                                ime: req.body.ime,
                                prezime: req.body.prezime,
                                username: req.body.username,
                                password: req.body.password,
                                datumRodjenja: req.body.datumRodjenja,
                                mestoRodjenja: req.body.mestoRodjenja,
                                telefon: req.body.telefon,
                                email: req.body.email
                            });
                            polj.save((err, response) => {
                                if (err) return res.status(402).send("Korisnicko ime je zauzeto");
                                else return res.status(200).send(response);
                            });
                        }
                        else
                            return res.send("Korisnicko ime je zauzeto")
                    })

                }
                else
                    return res.send("Korisnicko ime je zauzeto");
            });

        }
        else
            return res.send("Korisnicko ime je zauzeto");
    })
});

router.post('/predZahtev', (req, res) => { //zahtev koji salje korisnik
    PoljZahtev.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            return res.send(err);
        }
        if (!user) {
            Poljoprivrednik.findOne({ username: req.body.username }, (err1, user1) => {
                if (err1) {
                    return res.send(err1);
                }
                if (!user1) {
                    Preduzece.findOne({ username: req.body.username }, (err2, user2) => {
                        if (err2) {
                            return res.send(err2)
                        }
                        if (!user2) {
                            const pred = new PredZahtev({
                                ime: req.body.ime,
                                username: req.body.username,
                                password: req.body.password,
                                datumOsnivanja: req.body.datumOsnivanja,
                                mesto: req.body.mesto,
                                email: req.body.email
                            });
                            pred.save((err3, response) => {
                                if (err3) return res.status(400).send(err3);
                                else return res.status(200).send(response);
                            })
                        }
                        else
                            return res.send("Korisnicko ime je zauzeto")
                    })

                }
                else
                    return res.send("Korisnicko ime je zauzeto");
            });
        }
        else
            return res.send("Korisnicko ime je zauzeto");
    })
});

router.post('/poljoprivrednik', (req, res) => { //admin koji odobrava registraciju
    const polj = new Poljoprivrednik({
        ime: req.body.ime,
        prezime: req.body.prezime,
        username: req.body.username,
        password: req.body.password,
        datumRodjenja: req.body.datumRodjenja,
        mestoRodjenja: req.body.mestoRodjenja,
        telefon: req.body.telefon,
        email: req.body.email
    });
    polj.save((err, user) => {
        if (err) return res.status(400).send(err);
        else {
            PoljZahtev.deleteOne({ username: req.body.username }, (err1, user1) => {
                if (err1) return res.status(400).send(err);

                else {
                    console.log(user1);
                    return res.status(200).send(user1);
                }
            });

        }
    });

});

router.post('/preduzece', (req, res) => { //admin koji odobrava registraciju
    console.log('uspeh');
    console.log(req.body);
    const pred = new Preduzece({
        ime: req.body.ime,
        username: req.body.username,
        password: req.body.password,
        datumOsnivanja: req.body.datumOsnivanja,
        mesto: req.body.mesto,
        email: req.body.email
    });
    pred.save((err, user) => {
        if (err) res.status(401).send(err);
        else {
            PredZahtev.deleteOne({ username: req.body.username }, (err1, user1) => {
                if (err1) return res.status(406).send(err1);
                else return res.status(200).send(user1);
            });
        }
    });
});

router.post('/dodajPolj', (req, res) => { //admin dodaje korisnika
    Preduzece.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            return res.stutus(401).send("Korisnicko ime je zauzeto");
        }
        if (!user) {
            PredZahtev.findOne({ username: req.body.username }, (err1, user1) => {
                if (err1) {
                    return res.send(err1);
                }
                if (!user1) {
                    PoljZahtev.findOne({ username: req.body.username }, (err2, user2) => {
                        if (err2) {
                            return res.send(err2)
                        }
                        if (!user2) {
                            const polj = new Poljoprivrednik({
                                ime: req.body.ime,
                                prezime: req.body.prezime,
                                username: req.body.username,
                                password: req.body.password,
                                datumRodjenja: req.body.datumRodjenja,
                                mestoRodjenja: req.body.mestoRodjenja,
                                telefon: req.body.telefon,
                                email: req.body.email
                            });
                            polj.save((err, response) => {
                                if (err) return res.status(402).send("Korisnicko ime je zauzeto");
                                else return res.status(200).send(response);
                            });
                        }
                        else
                            return res.send("Korisnicko ime je zauzeto")
                    })

                }
                else
                    return res.send("Korisnicko ime je zauzeto");
            });

        }
        else
            return res.send("Korisnicko ime je zauzeto");
    })
});


router.post('/dodajPred', (req, res) => { //admin dodaje korisnika
    Poljoprivrednik.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            return res.status(401).send("Korisnicko ime je zauzeto");
        }
        if (!user) {
            PredZahtev.findOne({ username: req.body.username }, (err1, user1) => {
                if (err1) {
                    return res.send(err1);
                }
                if (!user1) {
                    PoljZahtev.findOne({ username: req.body.username }, (err2, user2) => {
                        if (err2) {
                            return res.send(err2)
                        }
                        if (!user2) {
                            const polj = new Preduzece({
                                ime: req.body.ime,
                                username: req.body.username,
                                password: req.body.password,
                                datumOsnivanja: req.body.datumOsnivanja,
                                mesto: req.body.mesto,
                                email: req.body.email
                            });
                            console.log(polj)
                            polj.save((err, response) => {
                                if (err) return res.status(402).send(err);
                                else return res.status(200).send(response);
                            });
                        }
                        else
                            return res.send("Korisnicko ime je zauzeto")
                    })

                }
                else
                    return res.send("Korisnicko ime je zauzeto");
            });

        }
        else
            return res.send("Korisnicko ime je zauzeto");
    })
});

router.post('/azurirajPred', (req,res)=>{
    Preduzece.findOneAndUpdate({username: req.body.username}, 
        {ime: req.body.ime, mesto: req.body.mesto, email: req.body.email}, (err,save)=>{
            return res.send(save);
        })
})

router.post('/azurirajPolj', (req,res)=>{
    Poljoprivrednik.findOneAndUpdate({username: req.body.username}, 
        {ime: req.body.ime, prezime: req.body.prezime, telefon: req.body.telefon, email: req.body.email}, (err,save)=>{
            return res.send(save);
        })
})

module.exports = router;

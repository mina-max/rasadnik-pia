var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cors = require('cors');
const signup = require('./app/routes/signup');
const admin = require('./app/routes/admin');
const polj = require('./app/routes/poljoprivrednik');
const prod = require('./app/routes/prodavnica');
const Poljoprivrednik = require('./app/models/poljoprivrednik');
const Preduzece = require('./app/models/preduzece');
const Admin = require('./app/models/admin');
const Rasadnik = require('./app/models/rasadnik');
const Sadnica = require('./app/models/sadnica');
const Narudzbina = require('./app/models/narudzbina');

app.use(morgan('dev')); //sluzi za logovanje requestova
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/pia', function (err) {
    if (err) {
        console.log('Not connected to the database: ' + err);
    } else {
        console.log('Successfully connected to MongoDB!');
    }
});

app.listen(port, function () {
    console.log('Server started on port: ' + port);
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mirjana.radosavljevic.best@gmail.com',
        pass: 'Trentino44'
    }
});

app.use('/signup', signup);
app.use('/admin', admin);
app.use('/poljoprivrednik', polj);
app.use('/prodavnica', prod);

/*

setInterval(apdejtujNarudzbine, 24 * 3600000);

function apdejtujNarudzbine() {
    let danasnjiDatum = new Date();
    Narudzbina.find({}, (err,data)=>{
        data.forEach(narudzbina=>{
            var diff = Math.abs(danasnjiDatum.getTime() - narudzbina.datum.getTime());
            var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
            if(diffDays > 30) {
                narudzbina.poslovanje = false;
                narudzbina.save();
            }
        })
    })
}*/




setInterval(apdejtujSadnice, 24 * 3600000);
setInterval(apdejtujVremeITemp, 3600000);


function apdejtujSadnice() {
    Sadnica.updateMany({}, { $inc: { starost: 1 } }, (err, data) => { })
}

function apdejtujVremeITemp() {
    Rasadnik.find({}, (err, data) => {
        data.forEach(rasadnik => {
            rasadnik.temp = rasadnik.temp - 0.5;
            rasadnik.voda = rasadnik.voda - 1;
            if (rasadnik.temp >= 12 && rasadnik.voda >= 75) {
                rasadnik.obavesten = false;
            }
            rasadnik.save((err, data) => {
                if ((data.temp < 12 || data.voda < 75) && !data.obavesten) {
                    Poljoprivrednik.findOne({ username: data.username }, (err, d) => {
                        var mailOptions = {
                            from: 'mirjana.radosavljevic.best@gmail.com',
                            to: d.email,
                            subject: 'Upozorenje',
                            text: 'Rasadnik ' + rasadnik.naziv + ' zahteva održavanje!'
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                        data.obavesten = true;
                        data.save();
                    })
                }
            })
        })
    })
}


app.post('/login', (req, res) => {
    console.log('uspeh');
    Preduzece.findOne({ username: req.body.username, password: req.body.password }, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) {
            console.log("uspeh1");
            console.log(req.body.username);
            Poljoprivrednik.findOne({ username: req.body.username, password: req.body.password }, (err1, user1) => {
                console.log(req.body.username);
                if (err1) return res.status(500).send(err1);
                if (!user1) {
                    console.log("uspeh2");
                    Admin.findOne({ username: req.body.username, password: req.body.password }, (err2, user2) => {
                        if (err2) return res.status(500).send(err2);
                        if (!user2) return res.status(404).send(err2);
                        else return res.status(200).send({
                            "username": user2.username,
                            "password": user2.password,
                            "tip": user2.tip
                        });
                    })
                }
                else return res.status(200).send({
                    "username": user1.username,
                    "password": user1.password,
                    "tip": user1.tip
                });
            })
        }
        else return res.status(200).send({
            "username": user.username,
            "password": user.password,
            "tip": user.tip
        });
    })
});
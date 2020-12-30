import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ProdavnicaService } from 'src/app/prodavnica.service';
import { DialogKomentarService } from 'src/app/dialog-komentar.service';
import { DialogKorpaService } from 'src/app/dialog-korpa.service';
import { Artikal } from 'src/app/models/artikal';
import { Rasadnik } from 'src/app/models/rasadnik';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.css']
})
export class ProizvodComponent implements OnInit {

  constructor(private servis: ProdavnicaService,
    private dialogServis: DialogKomentarService,
    private dialogServ: DialogKorpaService,
    private notif: MatSnackBar,
    private router: Router) { }

  preduzece: boolean;

  ngOnInit(): void {
    this.preduzece = false;
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    if (localStorage.getItem('proizvod') != null) {
      this.proizvod = JSON.parse(localStorage.getItem('proizvod'));
    }
    else {
      this.proizvod = JSON.parse(localStorage.getItem('proizvodPreduzece'));
      this.preduzece = true;
    }
    this.servis.dovuciKomentare(this.proizvod).subscribe(
      value => {
        this.Komentari = value;

        if (!this.preduzece) {
          if (localStorage.getItem('korpa') != null) {
            this.Artikli = JSON.parse(localStorage.getItem('korpa'));
          }

          if (localStorage.getItem('idPoslednjePorudzbine') == null) {
            this.servis.dovuciIdPoslednjePorudzbine(this.user).subscribe(val => {
              this.idPoslednjePorudzbine = val.idPoslednjePorudzbine;
            })
          }
          else this.idPoslednjePorudzbine = JSON.parse(localStorage.getItem('idPoslednjePorudzbine'));
        }
        this.Komentari.forEach(k => {
          if (k.username == this.user.username) {
            this.o = k.ocena;
            this.komentarisao = true;
          }
        })
        this.proizvod.narucioci.forEach(n => {
          if (n == this.user.username) {
            this.narucivao = true;
          }
        })
      }
    )

  }
  o: any;
  user: User;
  proizvod: any;
  Komentari: any;
  idPoslednjePorudzbine: number;

  odjava() {
    this.servis.promeniIdPoslednjePorudzbine(this.user, this.idPoslednjePorudzbine).subscribe(val => {
      console.log(val);
    })
    localStorage.clear();
  }

  kom: any;
  komentarisao: boolean;
  narucivao: boolean;

  dodajKomentar() {

    this.dialogServis.openConfirmDialog().afterClosed().subscribe(
      value => {
        if (value != false) {
          var d = new Date();
          var kom = {
            tekst: value.kom,
            ocena: value.ocena,
            username: this.user.username,
            proizvodId: this.proizvod._id,
            tip: this.proizvod.tip,
            datum: d.toDateString()
          }
          this.servis.dodajKomentar(kom).subscribe(val => {
            this.Komentari.push(kom);
            this.komentarisao = true;
            this.o = value.ocena;
            this.proizvod.prosecnaOcena = val.prosecnaOcena;
            localStorage.setItem('proizvod', JSON.stringify(this.proizvod));
          })
        }
      }
    )
  }


  Artikli: Artikal[] = [];



  dodajProizvod() {
    var nar = {
      proizvod: this.proizvod,
      kolicina: 1,
    }
    var nasla = false;
    this.Artikli.forEach(n => {
      if (n.proizvod._id == this.proizvod._id) {
        n.kolicina++;
        nasla = true;
        return;
      }
    });
    if (!nasla) this.Artikli.push(nar);
    localStorage.setItem('korpa', JSON.stringify(this.Artikli));
    this.notif.open("Uspešno ste dodali proizvod u korpu!", "OK");

  }

  ras: Rasadnik;

  korpa() {
    localStorage.setItem('korpa', JSON.stringify(this.Artikli));
    this.dialogServ.openConfirmDialog().afterClosed().subscribe(val => {
      if (val != false) {
        if (localStorage.getItem('r') != null) {
          this.Artikli = JSON.parse(localStorage.getItem('korpa'));
          this.ras = JSON.parse(localStorage.getItem('r'));
          for (var i = 0; i < this.Artikli.length; i++) {
            var data = {
              idUkupni: this.idPoslednjePorudzbine,
              artikal: this.Artikli[i].proizvod,
              kolicina: this.Artikli[i].kolicina,
              proizvodjac: this.Artikli[i].proizvod.proizvodjac,
              rasadnikId: this.ras._id,
              rasadnikMesto: this.ras.mesto,
              narucilac: this.user.username,
              datum: new Date()
            }
            console.log(data);
            this.servis.naruci(data).subscribe(val => { });
          }
          this.notif.open("Uspešno ste naručili proizvode!", "OK");
          this.idPoslednjePorudzbine = this.idPoslednjePorudzbine + 1;
          this.Artikli = [];
          localStorage.setItem('idPoslednjePorudzbine', JSON.stringify(this.idPoslednjePorudzbine));
          localStorage.setItem('korpa', JSON.stringify(this.Artikli));
          localStorage.removeItem('r');
          this.router.navigate(['/prodavnica']);
          return;
        }
        else {
          this.notif.open('Niste odabrali rasadnik!', "OK")
        }
      }
      else {
        this.Artikli = JSON.parse(localStorage.getItem('korpa'));
        localStorage.setItem('korpa', JSON.stringify(this.Artikli));
      }
    })
  }



}

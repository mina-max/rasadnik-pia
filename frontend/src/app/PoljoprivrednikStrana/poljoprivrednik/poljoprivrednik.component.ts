import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Rasadnik } from '../../models/rasadnik';
import { PoljoprivrednikService } from '../../poljoprivrednik.service';
import { Router } from '@angular/router';
import { Sadnica } from 'src/app/models/sadnica';
import { interval, Subscription } from 'rxjs';
import { DialogService } from 'src/app/dialog.service';
import { ProdavnicaService } from 'src/app/prodavnica.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-poljoprivrednik',
  templateUrl: './poljoprivrednik.component.html',
  styleUrls: ['./poljoprivrednik.component.css']
})
export class PoljoprivrednikComponent implements OnInit {

  constructor(private servis: PoljoprivrednikService,
    private router: Router,
    private dialogServis: DialogService,
    private servisProd: ProdavnicaService,
    private notif: MatSnackBar) { }

  user: User;
  Rasadnici: Rasadnik[] = [];
  Sadnice: Sadnica[] = [];
  Matrica: number[][] = [];



  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    this.servis.dovuciRasadnike(this.user.username).subscribe(
      value => {
        this.Rasadnici = value;
        localStorage.setItem('rasadnici', JSON.stringify(this.Rasadnici));
        this.Rasadnici.forEach(rasadnik => {
          if (rasadnik.temp < 12 || rasadnik.voda < 75) {
            this.notif.open("Rasadnik " + rasadnik.naziv + " zahteva održavanje!", "", {
              horizontalPosition: "right"
            });
          }
        })
      },
      err => {
        alert("error");
      }
    );
    localStorage.setItem('dodajSadnicu', JSON.stringify(this.klik));

  }

  odjava() {
    if (localStorage.getItem('idPoslednjePorudzbine') != null) {
      var idPoslednjePorudzbine = JSON.parse(localStorage.getItem('idPoslednjePorudzbine'));
      this.servisProd.promeniIdPoslednjePorudzbine(this.user, idPoslednjePorudzbine).subscribe(val => {
        console.log(val);
      })
    }
    localStorage.clear();
  }

  selectedRow: number;
  selectionActive: boolean;

  M: number;
  N: number;

  prikaziSadnice(rasadnik, index) {
    var Matr: number[][] = [];
    this.selRasadnik = rasadnik;
    localStorage.setItem('selRasadnik', JSON.stringify(this.selRasadnik));
    this.selectedRow = index;
    this.selectionActive = true;
    this.M = rasadnik.duzina; //broj redova
    this.N = rasadnik.sirina;  //broj kolona
    console.log(this.M, this.N);
    for (var i: number = 0; i < this.M; i++) {
      Matr[i] = [];
      for (var j: number = 0; j < this.N; j++) {
        Matr[i][j] = 0;
      }
    }
    console.log(rasadnik);

    this.servis.dovuciSadnice(rasadnik).subscribe(
      value => {
        this.Sadnice = value;
        console.log(this.Sadnice)
        localStorage.setItem('sadnice', JSON.stringify(this.Sadnice));
        var arr: number[] = [];
        for (var p = 0; p < this.M * this.N; p++) {
          arr[p] = 0;
        }
        for (var i: number = 0; i < this.Sadnice.length; i++) {
          arr[this.Sadnice[i].pozicija] = 1;
        }
        var k;

        for (i = 0, k = -1; i < arr.length; i++) {
          if (i % this.N === 0) {
            k++;
            Matr[k] = [];
          }
          Matr[k].push(arr[i]);
        }
        console.log(Matr);
        this.Matrica = Matr;
        console.log(this.Matrica);
      }, err => {
        alert("error");
      });
  }

  position: number;

  selSadnica: Sadnica;
  selRasadnik: Rasadnik;
  sadnica: boolean;
  plus: boolean;
  procenat: number;
  procenatString: string;

  onMouseEnter(i, j) {
    this.plus = true;
    this.position = i * this.N + j;
    for (var k = 0; k < this.Sadnice.length; k++) {
      if (this.Sadnice[k].pozicija == this.position) {
        this.selSadnica = this.Sadnice[k];
        this.sadnica = true;
        this.procenat = (this.selSadnica.starost * 100 / this.selSadnica.zivotniVek);
        this.procenatString = this.procenat.toFixed(2);
        if (this.procenat >= 100) {
          this.procenat = 100;
          this.procenatString = this.procenat.toFixed(2);
        }
      }

    }

  }


  onMouseLeave() {
    this.plus = false;
    this.sadnica = false;
  }

  klik: boolean;
  prep: boolean;
  help: boolean;

  dodajSadnicuPreparat(i, j) {

    if (this.selRasadnik.pozCekanje.length != 0) {
      for (var k = 0; k < this.selRasadnik.pozCekanje.length; k++) {
        if (this.selRasadnik.pozCekanje[k] == i * this.N + j) return;
      }
    }

    localStorage.setItem('pozicija', JSON.stringify(i * this.N + j));
    this.klik = false;
    localStorage.setItem('dodajSadnicu', JSON.stringify(this.klik));
    localStorage.setItem('dodajPreparat', JSON.stringify(this.klik));
    if (this.sadnica) {
      for (var k = 0; k < this.Sadnice.length; k++) {
        if (this.Sadnice[k].pozicija == i * this.N + j) {
          console.log(this.Sadnice[k]);
          if (this.Sadnice[k].starost < this.Sadnice[k].zivotniVek) {
            localStorage.setItem('sadnicaZaPreparat', JSON.stringify(this.Sadnice[k]));
            this.prep = true;
            localStorage.setItem('dodajPreparat', JSON.stringify(this.prep));
            this.router.navigate(['/magacin']);
            break;
          }
          else {
            var sadnica = this.Sadnice[k];
            var m = k;
            this.dialogServis.openConfirmDialog().afterClosed().subscribe(res => {
              if (res) this.servis.ukloniSadnicu(sadnica).subscribe(res => {
                this.Sadnice.splice(m, 1);
                this.Matrica[i][j] = 0;
                this.selRasadnik.pozCekanje.push(i * this.N + j);
                this.servis.apdejtujCekanje(this.selRasadnik).subscribe(val => {
                  /*this.dan.subscribe(val=>{
                    //console.log("10sek")
                    var ind = this.selRasadnik.pozCekanje.indexOf(i*this.N+j);
                    this.selRasadnik.pozCekanje.splice(ind, 1);
                    this.servis.apdejtujCekanje(this.selRasadnik).subscribe(val=>{});
                  })*/
                })
              });
            });
          }
        }
      }

    }
    else {
      this.klik = true;
      localStorage.setItem('dodajSadnicu', JSON.stringify(this.klik));
      this.router.navigate(['/magacin']);
    }
  }

  prikaziMagacin() {
    this.klik = false;
    localStorage.setItem('dodajSadnicu', JSON.stringify(this.klik));
    localStorage.setItem('dodajPreparat', JSON.stringify(this.klik));
    this.router.navigate(['/magacin']);
  }

  promeniTemp(n: number) {
    this.selRasadnik.temp = this.selRasadnik.temp + n;
    this.Rasadnici[this.selectedRow] = this.selRasadnik;
    localStorage.setItem('selRasadnik', JSON.stringify(this.selRasadnik));
    localStorage.setItem('rasadnici', JSON.stringify(this.Rasadnici));
    if (this.selRasadnik.temp >= 12 && this.selRasadnik.voda >= 75)
      this.notif.dismiss();
    else this.notif.open("Rasadnik " + this.selRasadnik.naziv + " zahteva održavanje!", "", {
      horizontalPosition: "right"
    })

    this.servis.promeni(this.selRasadnik).subscribe(value => { })
  }

  promeniVodu(n: number) {
    this.selRasadnik.voda = this.selRasadnik.voda + n;
    this.Rasadnici[this.selectedRow] = this.selRasadnik;
    localStorage.setItem('selRasadnik', JSON.stringify(this.selRasadnik));
    localStorage.setItem('rasadnici', JSON.stringify(this.Rasadnici));
    if (this.selRasadnik.temp >= 12 && this.selRasadnik.voda >= 75)
      this.notif.dismiss()
    else this.notif.open("Rasadnik " + this.selRasadnik.naziv + " zahteva održavanje!", "", {
      horizontalPosition: "right"
    })
    this.servis.promeni(this.selRasadnik).subscribe(value => { })
  }

  /*sat = interval(3600000);
  vodaTemp = this.sat.subscribe(val => {
    this.servis.promeniSvima().subscribe(
      value => {
        this.servis.dovuciRasadnike(this.user.username).subscribe(
          value => {
            this.Rasadnici = value;
            localStorage.setItem('rasadnici', JSON.stringify(this.Rasadnici));
          },
          err => {
            alert("error");
          }
        );
      }
    );
  });*/

  /*dan = interval(24 * 3600000);
  //dan = interval(10000);
 
   ostari = this.dan.subscribe(val => {
     this.servis.ostari().subscribe(
       value => {
         if (this.selRasadnik) {
           this.servis.dovuciSadnice(this.selRasadnik).subscribe(
             val => {
               this.Sadnice = val;
               localStorage.setItem('sadnice', JSON.stringify(this.Sadnice));
             }
           );
         }
       }
     );
   });*/

}









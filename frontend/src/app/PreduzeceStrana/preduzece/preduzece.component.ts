import { Component, OnInit } from '@angular/core';
import { ProdavnicaService } from 'src/app/prodavnica.service';
import { PreduzeceService } from 'src/app/preduzece.service';
import { DialogPreduzeceService } from 'src/app/dialog-preduzece.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';


@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit {

  constructor(private servis: ProdavnicaService,
    private predServis: PreduzeceService,
    private dialog: DialogPreduzeceService,
    private notif: MatSnackBar) {
  }

  user: any;
  Narudzbine: any = [];
  artikli: any = [];


  ngOnInit(): void {
    this.Narudzbine = [];
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    this.servis.dovuciNarudzbine(this.user).subscribe(val => {
      this.Narudzbine = val;
      for (var i = 0; i < this.Narudzbine.length; i++) {
        if (this.Narudzbine[i].status == "Na čekanju") {
          let nasao = false;
          if (this.artikli.length != 0) {
            this.artikli.forEach(artikal => {
              if (artikal.narucilac == this.Narudzbine[i].narucilac &&
                artikal.idUkupni == this.Narudzbine[i].idUkupni) {
                nasao = true;
                artikal.proizvodi.push({ proizvod: this.Narudzbine[i].artikal, kolicina: this.Narudzbine[i].kolicina });
              }
            })

          }
          if (!nasao || this.artikli.length == 0) {
            let p = [];
            p.push({
              proizvod: this.Narudzbine[i].artikal,
              kolicina: this.Narudzbine[i].kolicina
            })
            this.artikli.push({
              idUkupni: this.Narudzbine[i].idUkupni,
              proizvodi: p,
              proizvodjac: this.Narudzbine[i].proizvodjac,
              rasadnikId: this.Narudzbine[i].rasadnikId,
              rasadnikMesto: this.Narudzbine[i].rasadnikMesto,
              narucilac: this.Narudzbine[i].narucilac,
              datum: new Date(this.Narudzbine[i].datum),
              status: this.Narudzbine[i].status
            })
          }
        }
      }
      for (var i = 0; i < this.Narudzbine.length; i++) {
        if (this.Narudzbine[i].status != "Na čekanju") {
          let nasao = false;
          if (this.artikli.length != 0) {
            this.artikli.forEach(artikal => {
              if (artikal.narucilac == this.Narudzbine[i].narucilac &&
                artikal.idUkupni == this.Narudzbine[i].idUkupni) {
                nasao = true;
                artikal.proizvodi.push({ proizvod: this.Narudzbine[i].artikal, kolicina: this.Narudzbine[i].kolicina });
              }
            })

          }
          if (!nasao || this.artikli.length == 0) {
            let p = [];
            p.push({
              proizvod: this.Narudzbine[i].artikal,
              kolicina: this.Narudzbine[i].kolicina
            })
            this.artikli.push({
              idUkupni: this.Narudzbine[i].idUkupni,
              proizvodi: p,
              proizvodjac: this.Narudzbine[i].proizvodjac,
              rasadnikId: this.Narudzbine[i].rasadnikId,
              rasadnikMesto: this.Narudzbine[i].rasadnikMesto,
              narucilac: this.Narudzbine[i].narucilac,
              datum: new Date(this.Narudzbine[i].datum),
              status: this.Narudzbine[i].status
            });
          }
        }
      }
      localStorage.setItem('artikli', JSON.stringify(this.artikli));
    });




    this.servis.mestoPreduzeca(this.user).subscribe(
      val => {
        this.Kuriri = val.kuriri;
        this.mestoPreduzeca = val.mesto;
      })



  }

  mestoPreduzeca: string;


  sel: number;
  selekt(narudzbina, i) {
    this.sel = i;
    if (!(this.artikli[i].status == "Isporučena") && !(this.artikli[i].status == "Isporuka u toku")) {
      this.dialog.openConfirmDialog().afterClosed().subscribe(
        val => {
          if (val != 2) {
            if (val) this.prihvatiNarudzbinu(narudzbina, i);
            else this.odbijNarudzbinu(narudzbina);
          }
        }
      )
    }
  }


  Kuriri: number;

  prihvatiNarudzbinu(narudzbina, ind) {

    this.servis.mestoPreduzeca(this.user).subscribe(
      val => {
        this.Kuriri = val.kuriri;
        console.log(this.Kuriri);
        if (this.Kuriri > 0) {
          this.Kuriri = this.Kuriri - 1;
          this.servis.promeniKurire(this.user, this.Kuriri).subscribe(val => { })
          this.izracunajVreme(narudzbina, ind);
        }
        else {
          this.notif.open("Svi kuriri su zauzeti! Narudžbina je NA ČEKANJU!", "OK");
          this.artikli[ind].status = "Na čekanju"
          this.servis.promeniStatus(this.artikli[ind]).subscribe(val => {
            var n = this.artikli[ind];
            this.artikli.splice(ind, 1);
            this.artikli.unshift(n);
          })

        }
      })

  }


  odbijNarudzbinu(narudzbina) {
    let index = this.artikli.indexOf(narudzbina);
    console.log(narudzbina);
    this.servis.odbijNarudzbinu(narudzbina).subscribe(val => {
      this.artikli.splice(index, 1);
      this.notif.open('Narudžbina je odbijena!', "OK");
    })
  }

  izracunajVreme(narudzbina, ind) {
    var gradIz, gradZa, lat1, lng1, lat2, lng2;
    gradIz = this.mestoPreduzeca;
    gradZa = narudzbina.rasadnikMesto;
    this.predServis.getLoc(gradIz).subscribe(
      val => {
        console.log(val.items[0].position);
        lat1 = val.items[0].position.lat;
        lng1 = val.items[0].position.lng;
        this.predServis.getLoc(gradZa).subscribe(
          val => {
            console.log(val.items[0].position);
            lat2 = val.items[0].position.lat;
            lng2 = val.items[0].position.lng;
            this.predServis.getTime(lat1, lng1, lat2, lng2).subscribe(
              val => {
                var distance = val.response.route[0].summary.distance;
                var time = val.response.route[0].summary.travelTime;
                var hours = (time / 3600);
                var rhours = Math.floor(hours);
                var minutes = (hours - rhours) * 60;
                var rminutes = Math.round(minutes);
                this.notif.open("Narudžbina je prihvaćena! Kurir je poslat u " + gradZa.charAt(0).toUpperCase() + gradZa.slice(1) + ". Udaljenost: " + (distance / 1000).toFixed(2) + "km " + "Vreme dostave: " + rhours + "h" + rminutes + "min", "OK");
                this.artikli[ind].status = "Isporuka u toku";
                this.servis.promeniStatusUToku(narudzbina, this.artikli[ind].status, time).subscribe(val => { })
              }
            )
          }
        )
      }
    )
  }

  sortedData: any;

  sortData(sort:Sort){
    if (!sort.active || sort.direction === '') {
      this.sortedData = this.artikli;
      return;
    }
    this.sortedData = this.artikli.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch(sort.active){
        case 'datum': return this.compare(a.datum, b.datum, isAsc);
      }
    })
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  

  odjava() {
    localStorage.clear();
  }

}

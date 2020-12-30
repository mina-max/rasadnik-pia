import { Component, OnInit } from '@angular/core';
import { Rasadnik } from 'src/app/models/rasadnik';
import { Sadnica } from 'src/app/models/sadnica';
import { PoljoprivrednikService } from 'src/app/poljoprivrednik.service';
import { Preparat } from 'src/app/models/preparat';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdavnicaService } from 'src/app/prodavnica.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-magacin',
  templateUrl: './magacin.component.html',
  styleUrls: ['./magacin.component.css']
})
export class MagacinComponent implements OnInit {

  constructor(private servis: PoljoprivrednikService,
    private router: Router,
    private notif: MatSnackBar,
    private servisProd: ProdavnicaService) { }

  ngOnInit(): void {
    this.selRasadnik = JSON.parse(localStorage.getItem('selRasadnik'));
    this.samoSadnice = JSON.parse(localStorage.getItem('dodajSadnicu'));
    this.samoPreparati = JSON.parse(localStorage.getItem('dodajPreparat'));
    this.servis.dovuciSadniceMagacin(this.selRasadnik).subscribe(
      val => {
        console.log(val);
        this.Sadnice = val;
        this.showSadnice = this.Sadnice;
        console.log(this.Sadnice);
        localStorage.setItem('sadniceMagacin', JSON.stringify(this.Sadnice));
        this.servis.dovuciPreparateMagacin(this.selRasadnik).subscribe(
          val => {
            this.Preparati = val;
            this.showPreparati = this.Preparati;
            this.servis.dovuciNarudzbineSadnice(this.selRasadnik).subscribe(
              val => {
                console.log(val);
                this.narudzbineSadnice = val;
                this.servis.dovuciNarudzbinePreparati(this.selRasadnik).subscribe(
                  val => {
                    this.narudzbinePreparati = val;
                  }
                )

              }
            )
          },
          err => {
            alert("error");
          }
        )
      },
      err => {
        alert("error")
      }
    );
  }


  selRasadnik: Rasadnik;
  Sadnice: any;
  Preparati: any;
  samoSadnice: boolean;
  samoPreparati: boolean;
  selectionActive: boolean;
  narudzbinePreparati: any = [];
  narudzbineSadnice: any = [];

  odjava() {
    if (localStorage.getItem('idPoslednjePorudzbine') != null) {
      var user = JSON.parse(localStorage.getItem('loggedUser'));
      var idPoslednjePorudzbine = JSON.parse(localStorage.getItem('idPoslednjePorudzbine'));
      this.servisProd.promeniIdPoslednjePorudzbine(user, idPoslednjePorudzbine).subscribe(val => {
        console.log(val);
      })
    }
    localStorage.clear();
  }

  sel: number;

  izabranaSadnica(sadnica, i) {
    //localStorage.setItem('sadnicaZaDodavanje', JSON.stringify(sadnica));
    //this.selectionActive = true;
    this.sel = i;
    //localStorage.setItem('selectionActive', JSON.stringify(this.selectionActive));

  }


  dodajSadnicu(sadnica) {
    const poz = JSON.parse(localStorage.getItem('pozicija'));
    const sad = {
      id: sadnica._id,
      naziv: sadnica.naziv,
      pozicija: poz,
      rasadnik: this.selRasadnik.naziv,
      rasadnikId: this.selRasadnik._id,
      proizvodjac: sadnica.proizvodjac,
      starost: sadnica.starost,
      zivotniVek: sadnica.zivotniVek
    };
    this.servis.dodajSadnicu(sad).subscribe(
      value => {
        this.notif.open("Uspešno ste dodali sadnicu!", "OK");
        return this.router.navigate(['/poljoprivrednik']);
      },
      err => {
        return alert("error");
      }
    )
  }
  sel1: boolean;

  izabranPreparat(i) {
    this.sel1 = i;
  }

  sadnicaZaPreparat: Sadnica;

  dodajPreparat(preparat) {
    this.sadnicaZaPreparat = JSON.parse(localStorage.getItem('sadnicaZaPreparat'));
    this.servis.dodajPreparat(this.sadnicaZaPreparat, preparat).subscribe(
      val => {
        this.notif.open("Uspešno ste dodali preparat", "OK");
        this.router.navigate(['/poljoprivrednik']);
      }
    )
  }

  otkazi(narudzbina) {

    this.servis.otkazi(narudzbina).subscribe(val => {
      if (this.narudzbinePreparati.includes(narudzbina)) {
        let index = this.narudzbinePreparati.indexOf(narudzbina);
        this.narudzbinePreparati.splice(index, 1);
      }
      else {
        let index = this.narudzbineSadnice.indexOf(narudzbina);
        this.narudzbineSadnice.splice(index, 1);

      }
      this.notif.open("Uspešno ste otkazali narudžbinu!", "OK");
    })
  }

  sortedData: any;

  sortDataP(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.sortedData = this.Preparati;
      return;
    }
    this.sortedData = this.Preparati.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'naziv': return this.compare(a.naziv, b.naziv, isAsc);
        case 'proizvodjac': return this.compare(a.proizvodjac, b.proizvodjac, isAsc);
        case 'kolicina': return this.compare(a.kolicina, b.kolicina, isAsc);
      }
    })
  }

  sortDataS(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.sortedData = this.Sadnice;
      return;
    }
    this.sortedData = this.Sadnice.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'naziv': return this.compare(a.naziv, b.naziv, isAsc);
        case 'proizvodjac': return this.compare(a.proizvodjac, b.proizvodjac, isAsc);
        case 'kolicina': return this.compare(a.kolicina, b.kolicina, isAsc);
      }
    })
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  naziv: string;
  proizvodjac: string;
  kolicina: string;

  showSadnice: any;
  showPreparati: any;

  filter() {
    console.log(this.naziv, this.proizvodjac)
    if ((this.naziv == "" || this.naziv == null) && (this.proizvodjac == "" || this.proizvodjac == null)
     && (this.kolicina == "" || this.kolicina == null)) {
      this.showSadnice = this.Sadnice;
      this.showPreparati = this.Preparati;
      return;
    }
    if (this.naziv && this.proizvodjac && this.kolicina) {
      this.showSadnice = this.Sadnice.filter(element=>{
        return (element.naziv == this.naziv) && (element.proizvodjac == this.proizvodjac)
        && (element.kolicina >= this.kolicina);
      })
      this.showPreparati = this.Preparati.filter(element=>{
        return (element.naziv == this.naziv) && (element.proizvodjac == this.proizvodjac)
        && (element.kolicina >= this.kolicina);
      })
      return;
    }
    if (this.naziv && this.proizvodjac) {
      this.showSadnice = this.Sadnice.filter(element=>{
        return (element.naziv == this.naziv) && (element.proizvodjac == this.proizvodjac);
      })
      this.showPreparati = this.Preparati.filter(element=>{
        return (element.naziv == this.naziv) && (element.proizvodjac == this.proizvodjac);
      })
      return;
    }
    if(this.naziv && this.kolicina){
      this.showSadnice = this.Sadnice.filter(element=>{
        return element.naziv == this.naziv && element.kolicina >= this.kolicina;
      })
      this.showPreparati = this.Preparati.filter(element=>{
        return element.naziv == this.naziv && element.kolicina >= this.kolicina;
      })
      return;
    }
    if(this.naziv){
      this.showSadnice = this.Sadnice.filter(element=>{
        return element.naziv == this.naziv;
      })
      this.showPreparati = this.Preparati.filter(element=>{
        return element.naziv == this.naziv;
      })
      return;
    }
    if(this.proizvodjac && this.kolicina){
      this.showSadnice = this.Sadnice.filter(element=>{
        return element.proizvodjac == this.proizvodjac && (element.kolicina >= this.kolicina);
      })
      this.showPreparati = this.Preparati.filter(element=>{
        return element.proizvodjac == this.proizvodjac && (element.kolicina >= this.kolicina);
      })
      return;
    }
    if(this.proizvodjac){
      this.showSadnice = this.Sadnice.filter(element=>{
        return element.proizvodjac == this.proizvodjac;
      })
      this.showPreparati = this.Preparati.filter(element=>{
        return element.proizvodjac == this.proizvodjac;
      })
      return;
    }
    
    if(this.kolicina){
      this.showSadnice = this.Sadnice.filter(element=>{
        return element.kolicina >= this.kolicina;
      })
      this.showPreparati = this.Preparati.filter(element=>{
        return element.kolicina >= this.kolicina;
      })
      return;
    }

  }



}

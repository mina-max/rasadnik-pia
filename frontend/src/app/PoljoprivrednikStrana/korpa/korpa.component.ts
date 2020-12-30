import { Component, OnInit } from '@angular/core';
import { Artikal } from 'src/app/models/artikal';
import { Rasadnik } from 'src/app/models/rasadnik';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.component.html',
  styleUrls: ['./korpa.component.css']
})
export class KorpaComponent implements OnInit {

  constructor(private ref: MatDialogRef<KorpaComponent>) { }

  ngOnInit(): void {
    this.postoji = false;
    this.msg = "Korpa je prazna";
    if(localStorage.getItem('korpa')!=null){
      this.Artikli = JSON.parse(localStorage.getItem('korpa'));
      if(this.Artikli.length != 0) this.postoji = true;
    }
    this.Rasadnici = JSON.parse(localStorage.getItem('rasadnici'));
    for(var i = 0; i < this.Artikli.length; i++){
      console.log(this.Artikli[i].proizvod.cena);
      this.cena+=this.Artikli[i].proizvod.cena*this.Artikli[i].kolicina;
      console.log(this.cena)
    }
  }
  Artikli: Artikal[] = [];
  Rasadnici: Rasadnik[] = [];
  msg: string;
  postoji: boolean;
  sel: boolean;
  ras:Rasadnik;
  cena:number = 0;

  obrisi(p) {
    p.kolicina--;
    this.cena-=p.proizvod.cena;
    if (p.kolicina == 0) {
      var ind = this.Artikli.indexOf(p);
      this.Artikli.splice(ind,1);
      if(this.Artikli.length == 0) this.postoji = false;
    }
    localStorage.setItem('korpa', JSON.stringify(this.Artikli));
  }

  selektujRasadnik(ras) {
    if(ras == "") return;
    this.Rasadnici.forEach(r =>{
      if(r._id == ras) {
        localStorage.setItem("r", JSON.stringify(r));
        this.ref.close();
      }
    });
  }

}

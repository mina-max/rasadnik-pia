import { Component, OnInit } from '@angular/core';
import { Sadnica } from 'src/app/models/sadnica';
import { Preparat } from 'src/app/models/preparat';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { ProdavnicaService } from 'src/app/prodavnica.service';

@Component({
  selector: 'app-prodavnica',
  templateUrl: './prodavnica.component.html',
  styleUrls: ['./prodavnica.component.css']
})
export class ProdavnicaComponent implements OnInit {

  constructor(private servis: ProdavnicaService,
    private router: Router) { }

  ngOnInit() {
    this.servis.dovuciSadnice().subscribe(
      val => {
        console.log(val);
        this.Sadnice = val;
        console.log(this.Sadnice);
        this.servis.dovuciPreparate().subscribe(
          val => {
            this.Preparati = val;
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

  Sadnice: any;
  Preparati: any;

  sel: boolean;
  sel1: boolean;

  odjava() {
    if (localStorage.getItem('idPoslednjePorudzbine') != null) {
      var user = JSON.parse(localStorage.getItem('loggedUser'));
      var idPoslednjePorudzbine = JSON.parse(localStorage.getItem('idPoslednjePorudzbine'));
      this.servis.promeniIdPoslednjePorudzbine(user, idPoslednjePorudzbine).subscribe(val => {
        console.log(val);
      })
    }
    localStorage.clear();
  }

  izabranaSadnica(i) {
    this.sel = i;
  }

  izabranPreparat(i) {
    this.sel1 = i;
  }

  detaljnoProizvod(proizvod) {
    localStorage.setItem('proizvod', JSON.stringify(proizvod));
  }

}

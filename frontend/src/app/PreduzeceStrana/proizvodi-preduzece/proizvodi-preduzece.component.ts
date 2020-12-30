import { Component, OnInit } from '@angular/core';
import { ProdavnicaService } from 'src/app/prodavnica.service';
import { Router } from '@angular/router';
import { Sadnica } from 'src/app/models/sadnica';
import { Preparat } from 'src/app/models/preparat';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-proizvodi-preduzece',
  templateUrl: './proizvodi-preduzece.component.html',
  styleUrls: ['./proizvodi-preduzece.component.css']
})
export class ProizvodiPreduzeceComponent implements OnInit {

  constructor(private servis: ProdavnicaService,
    private router: Router,
    private notif: MatSnackBar) { }

  user:any;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    this.servis.dovuciSadnicePreduzece(this.user).subscribe(
      val => {
        this.Sadnice = val;
        this.servis.dovuciPreparatePreduzece(this.user).subscribe(val => {this.Preparati = val;} )
      }
    );
  }

  Sadnice: any;
  Preparati: any;

  detaljnoProizvod(proizvod) {
    console.log(proizvod)
    localStorage.setItem('proizvodPreduzece', JSON.stringify(proizvod));
  }

  povuci(proizvod, i) {
    if(proizvod.tip == "S") {
      this.Sadnice.splice(i, 1);
    } else {
      this.Preparati.splice(i,1);
    }
    this.servis.povuciProizvod(proizvod).subscribe(
      val=>{
      
      this.notif.open("Uspešno ste povukli proizvod iz prodaje");
    });
  }
  

  odjava() {
    localStorage.clear();
  }

}

import { Component, OnInit } from '@angular/core';
import { PoljoprivrednikService } from 'src/app/poljoprivrednik.service';
import { Rasadnik } from 'src/app/models/rasadnik';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { ProdavnicaService } from 'src/app/prodavnica.service';

@Component({
  selector: 'app-dodaj-rasadnik',
  templateUrl: './dodaj-rasadnik.component.html',
  styleUrls: ['./dodaj-rasadnik.component.css']
})
export class DodajRasadnikComponent implements OnInit {

  constructor(private servis: PoljoprivrednikService,
    private router: Router,
    private servisProd: ProdavnicaService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
  }
  user:User;

  naziv:string;
mesto: string;
sirina: number;
duzina:number;

  odjava() {
    if (localStorage.getItem('idPoslednjePorudzbine') != null) {
      var idPoslednjePorudzbine = JSON.parse(localStorage.getItem('idPoslednjePorudzbine'));
      this.servisProd.promeniIdPoslednjePorudzbine(this.user, idPoslednjePorudzbine).subscribe(val => {
        console.log(val);
      })
    }
    localStorage.clear();
  }
  dodaj(){
    if(this.sirina <= 0 || this.duzina <= 0) return;
    const rasadnik = {
    username: this.user.username,
    naziv: this.naziv,
    mesto: this.mesto,
    sadnice: 0,
    slobodnaMesta: this.sirina*this.duzina,
    voda: 200,
    temp: 18,
    sirina: this.sirina,
    duzina: this.duzina
    }
    this.servis.dodajRasadnik(rasadnik).subscribe(
      value=>{
        this.router.navigate(['/poljoprivrednik']);
      }
    )

  }

}

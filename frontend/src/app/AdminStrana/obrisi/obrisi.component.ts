import { Component, OnInit } from '@angular/core';
import { RegistrovanjeService } from 'src/app/registrovanje.service';
import { Poljoprivrednik } from 'src/app/models/poljoprivrednik';
import { Preduzece } from 'src/app/models/preduzece';
import { Router } from '@angular/router';

@Component({
  selector: 'app-obrisi',
  templateUrl: './obrisi.component.html',
  styleUrls: ['./obrisi.component.css']
})
export class ObrisiComponent implements OnInit {

  constructor(private servis: RegistrovanjeService,
    private router:Router) { }

  PoljoprivredniciKor: Poljoprivrednik[] = [];
  PreduzecaKor: Preduzece[] = [];

  ngOnInit(): void {
    this.servis.dovuciPoljKor().subscribe(
      value => {
        console.log(value);
        this.PoljoprivredniciKor = value;
        localStorage.setItem('poljoprivredniciKor', JSON.stringify(this.PoljoprivredniciKor));
        this.servis.dovuciPredKor().subscribe(
          val => {
            console.log(val);
            this.PreduzecaKor = val;
            localStorage.setItem('preduzecaKor', JSON.stringify(this.PreduzecaKor));
            console.log(val);
          },
          err => {
            alert("error")
          }
        );
      },
      err => {
        alert("error");
      }
    );
  }

  obrisiPolj(username, i) {
    this.servis.obrisiPoljKor(this.PoljoprivredniciKor[i]).subscribe(
      val => {
        this.PoljoprivredniciKor.splice(i, 1);
        localStorage.setItem('poljoprivredniciKor', JSON.stringify(this.PoljoprivredniciKor));
      },
      err => {
        alert("ERROR");
      }
    );

  }

  obrisiPred(username, i) {
    this.servis.obrisiPredKor(this.PreduzecaKor[i]).subscribe(
      val => {
        this.PreduzecaKor.splice(i, 1);
        localStorage.setItem('preduzecaKor', JSON.stringify(this.PreduzecaKor));
      },
      err => {
        alert("ERROR");
      }
    );
  }

  azurirajPred(pred){
    localStorage.setItem('azuriranjePred', JSON.stringify(pred));
    this.router.navigate(['/azurirajPred'])
  }
  azurirajPolj(polj){
    localStorage.setItem('azuriranjePolj', JSON.stringify(polj));
    this.router.navigate(['/azurirajPolj'])
  }

  odjava() {
    localStorage.clear();
  }

}

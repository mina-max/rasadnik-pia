import { Component, OnInit } from '@angular/core';
import { RegistrovanjeService } from '../../registrovanje.service';
import { Poljoprivrednik } from '../../models/poljoprivrednik';
import { Preduzece } from '../../models/preduzece';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private servis: RegistrovanjeService) { 
   
  }

  Poljoprivrednici: Poljoprivrednik[] = [];
  Preduzeca: Preduzece[] = [];

  ngOnInit(): void {
    this.servis.dovuciPolj().subscribe(
      value => {
        console.log(value);
        this.Poljoprivrednici = value;
        localStorage.setItem('poljoprivrednici', JSON.stringify(this.Poljoprivrednici));
        this.servis.dovuciPred().subscribe(
          val => {
            console.log(val);
            this.Preduzeca = val;
            localStorage.setItem('preduzeca', JSON.stringify(this.Preduzeca));
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

  prihvatiPolj(username, i) {
    
    this.servis.prihvatiPolj(this.Poljoprivrednici[i]).subscribe(
      val => {
        this.Poljoprivrednici.splice(i, 1);
        localStorage.setItem('poljoprivrednici', JSON.stringify(this.Poljoprivrednici));
      },
      err => {
        alert("ERROR");
      }
    );
  }
  
  prihvatiPred(username, i){
    this.servis.prihvatiPred(this.Preduzeca[i]).subscribe(
      val => {
        this.Preduzeca.splice(i, 1);
        localStorage.setItem('preduzeca', JSON.stringify(this.Preduzeca));
      },
      err => {
        alert("ERROR");
      }
    );
    
  }

  obrisiPolj(username,i) {
    this.servis.obrisiPolj(this.Poljoprivrednici[i]).subscribe(
      val => {
        this.Poljoprivrednici.splice(i, 1);
        localStorage.setItem('poljoprivrednici', JSON.stringify(this.Poljoprivrednici));
      },
      err => {
        alert("ERROR");
      }
    );
  }

  obrisiPred(username,i) {
    this.servis.obrisiPred(this.Preduzeca[i]).subscribe(
      val => {
        this.Preduzeca.splice(i, 1);
        localStorage.setItem('preduzeca', JSON.stringify(this.Preduzeca));
      },
      err => {
        alert("ERROR");
      }
    );
  }

  odjava() {
    localStorage.clear();
  }

  

}

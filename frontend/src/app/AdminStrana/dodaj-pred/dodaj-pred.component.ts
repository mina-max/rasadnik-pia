import { Component, OnInit } from '@angular/core';
import { RegistrovanjeService } from 'src/app/registrovanje.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dodaj-pred',
  templateUrl: './dodaj-pred.component.html',
  styleUrls: ['./dodaj-pred.component.css']
})
export class DodajPredComponent implements OnInit {

  constructor(private servis: RegistrovanjeService,
    private router: Router) { }

    ngOnInit(): void {}

    ime: string;
    username: string;
    password: string;
    password2: string;
    datumOsnivanja: Date;
    mesto: string;
    email: string;
  
  
   
  
    signup() {
      console.log(this.ime, this.username, this.password,
        this.datumOsnivanja, this.mesto, this.email)
      
      this.servis.dodajPreduzece(this.ime, this.username, this.password,
        this.datumOsnivanja, this.mesto, this.email).subscribe(
          value => {
            this.router.navigate(['/dodaj']);
          },
          error => {
            console.log(error);
          }
        );
    }

  odjava() {
    localStorage.clear();
  }

}

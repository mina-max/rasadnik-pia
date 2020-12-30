import { Component, OnInit } from '@angular/core';
import { RegistrovanjeService } from 'src/app/registrovanje.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dodaj-polj',
  templateUrl: './dodaj-polj.component.html',
  styleUrls: ['./dodaj-polj.component.css']
})
export class DodajPoljComponent implements OnInit {

  constructor(private servis: RegistrovanjeService,
    private router: Router) { }

  ime: string;
  prezime: string;
  username: string;
  password: string;
  password2: string;
  datumRodjenja: Date;
  mestoRodjenja: string;
  telefon: number;
  email: string;

  message:string;

  ngOnInit(): void {
  }

  signup() {
    this.servis.dodajPoljoprivrednika(this.ime, this.prezime, this.username, this.password,
      this.datumRodjenja, this.mestoRodjenja, this.telefon, this.email).subscribe(
        value => {
          message: "Uspesno ste poslali zahtev za registraciju";
          alert('uspeh');
          this.router.navigate(['/dodaj']);
        },
        error => {
          alert(error.error);
        }
      );
  }

  odjava() {
    localStorage.clear();
  }

}

import { Component, OnInit } from '@angular/core';
import { RegistrovanjeService } from '../../registrovanje.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-reg-poljoprivrednik',
  templateUrl: './reg-poljoprivrednik.component.html',
  styleUrls: ['./reg-poljoprivrednik.component.css']
})
export class RegPoljoprivrednikComponent implements OnInit {

  constructor(private servis: RegistrovanjeService,
    private router: Router,
    private notif: MatSnackBar) { }

  ime: string;
  prezime: string;
  username: string;
  password: string;
  password2: string;
  datumRodjenja: Date;
  mestoRodjenja: string;
  telefon: string;
  email: string;
  recap:boolean;

  emailRegex: RegExp;
  passwordRegex: RegExp;
  numberRegex: RegExp;

  message:string;

  ngOnInit(): void {
    this.emailRegex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");
    this.passwordRegex = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[@$!%*#?&])[a-zA-Z].{6,}$");
    this.numberRegex = new RegExp("^[0][6][0-9]{8}$")
    this.recap = false;
  }

  signup() {
    if(this.ime == null || this.prezime == null || this.username == null || this.password == null
      || this.password2 == null || this.datumRodjenja == null || this.mestoRodjenja == null || this.telefon == null
      || this.email == null ){
        this.notif.open("Sva polja su obavezna!", "OK");
        return;
      }
      if(this.passwordRegex.exec(this.password) == null) {
        this.notif.open("Lozinka mora imati minimalno 7 karaktera, od toga bar jedno veliko slovo, jedan broj i jedan specijalni karakter, i mora počinjati slovom!", "OK");
        return;
      }
      if(this.password != this.password2) {
        this.notif.open("Lozinke se ne poklapaju!", "OK");
        return;
      }

      if(this.emailRegex.exec(this.email) == null) {
        this.notif.open("Email je u pogrešnom formatu!", "OK");
        return;
      }
      if(this.numberRegex.exec(this.telefon) == null){
        this.notif.open("Broj telefona je u pogrešnom formatu!", "OK");
        return;
      }
      if(this.recap == false) {
        this.notif.open("Potvrdite da niste robot!","OK");
        return;
      }
      




    this.servis.zahtevPoljoprivrednik(this.ime, this.prezime, this.username, this.password,
      this.datumRodjenja, this.mestoRodjenja, this.telefon, this.email).subscribe(
        value => {
          this.notif.open("Uspešno ste poslali zahtev za registraciju!", "OK");
          this.router.navigate(['']);
        },
        error => {
          this.notif.open("Korisničko ime već postoji!", "OK");
        }
      );

  }

  captcha() {
    this.recap = true;
  }



}

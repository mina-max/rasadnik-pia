import { Component, OnInit } from '@angular/core';
import { LogovanjeService } from '../../logovanje.service';
import { User } from '../../models/user';
import { ProdavnicaService } from 'src/app/prodavnica.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sifra',
  templateUrl: './sifra.component.html',
  styleUrls: ['./sifra.component.css']
})
export class SifraComponent implements OnInit {

  constructor(private servis: LogovanjeService,
    private servisProd: ProdavnicaService,
    private notif: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    this.passwordRegex = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[@$!%*#?&])[a-zA-Z].{6,}$");
  }

  staraSifra: string;
  novaSifra: string;
  novaSifra2: string;

  passwordRegex: RegExp;

  message: string;

  user: User;

  odjava() {
    localStorage.clear();
  }

  promeniLozinku() {

    if (this.staraSifra == this.novaSifra) {
      this.notif.open("Nova lozinka ne može biti ista kao stara!", "OK");
      return;
    }
   
    if(this.passwordRegex.exec(this.novaSifra) == null){
      this.notif.open("Lozinka je u pogrešnom formatu!", "OK");
      return;
    }
    if (this.novaSifra != this.novaSifra2) {
      this.notif.open("Lozinke se ne poklapaju!", "OK");
      return;
    }
    this.servis.promenaSifre(this.user.username, this.staraSifra, this.novaSifra).subscribe(
      val => {
        this.notif.open("Uspešno ste promenili lozinku!", "OK");
        this.user = {
          username: this.user.username,
          password: this.novaSifra,
          tip: this.user.tip
        }
        localStorage.setItem('loggedUser', JSON.stringify(this.user));
        this.odjava();
        this.router.navigate(['/login']);
      },
      err => {
        this.notif.open("Pogrеšna lozinka!", "OK")
      }
    )
  }

}

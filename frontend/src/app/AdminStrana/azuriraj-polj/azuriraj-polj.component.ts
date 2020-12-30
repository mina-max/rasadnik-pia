import { Component, OnInit } from '@angular/core';
import { RegistrovanjeService } from 'src/app/registrovanje.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-azuriraj-polj',
  templateUrl: './azuriraj-polj.component.html',
  styleUrls: ['./azuriraj-polj.component.css']
})
export class AzurirajPoljComponent implements OnInit {

  constructor(private servis: RegistrovanjeService,
    private router: Router) { }

    ngOnInit(): void {
      var polj = JSON.parse(localStorage.getItem('azuriranjePolj'));
     
      this.ime = polj.ime;
      this.prezime = polj.prezime;
      this.username = polj.username;
      this.telefon = polj.telefon;
      this.email = polj.email;
    }

    ime: string;
    prezime: string;
    username: string;
    mesto: string;
    telefon: string;
    email: string;
  
  
   
  
    signup() {
      console.log(this.ime, this.username, this.mesto, this.email)
      
      this.servis.azurirajPoljoprivrednik(this.ime, this.prezime, this.username, this.telefon, this.email).subscribe(
          value => {
            this.router.navigate(['/obrisi']);
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

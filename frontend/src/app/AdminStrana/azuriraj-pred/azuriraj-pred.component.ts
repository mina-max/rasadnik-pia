import { Component, OnInit } from '@angular/core';
import { RegistrovanjeService } from 'src/app/registrovanje.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-azuriraj-pred',
  templateUrl: './azuriraj-pred.component.html',
  styleUrls: ['./azuriraj-pred.component.css']
})
export class AzurirajPredComponent implements OnInit {

  constructor(private servis: RegistrovanjeService,
    private router: Router) { }

    ngOnInit(): void {
      var pred = JSON.parse(localStorage.getItem('azuriranjePred'));
     
      this.ime = pred.ime;
      this.username = pred.username;
      this.mesto = pred.mesto;
      this.email = pred.email;
    }

    ime: string;
    username: string;
    mesto: string;
    email: string;
  
  
   
  
    signup() {
      console.log(this.ime, this.username, this.mesto, this.email)
      
      this.servis.azurirajPreduzece(this.ime, this.username, this.mesto, this.email).subscribe(
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

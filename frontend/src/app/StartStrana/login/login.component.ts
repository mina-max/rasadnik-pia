import { Component, OnInit } from '@angular/core';
import { LogovanjeService } from '../../logovanje.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private servis: LogovanjeService, private router: Router,
    private notif:MatSnackBar) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;

  user: any;

  login(): void{
    this.servis.login(this.username, this.password).subscribe(
      value => {
        this.user = value;
        localStorage.setItem('loggedUser', JSON.stringify(this.user));
        if(this.user.tip == "0") {
          this.router.navigate(['/admin']);
        }
        if(this.user.tip == "1") {
          this.router.navigate(['/poljoprivrednik']);
        }
        if(this.user.tip == "2") {
          this.router.navigate(['/preduzece']);
        }
      },
      error => {
        this.notif.open("Pogrešno koridsničko ime ili lozinka!", "OK")
      }
    );
    
  }



}

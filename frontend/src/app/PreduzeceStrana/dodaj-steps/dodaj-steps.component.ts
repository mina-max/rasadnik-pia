import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProdavnicaService } from 'src/app/prodavnica.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dodaj-steps',
  templateUrl: './dodaj-steps.component.html',
  styleUrls: ['./dodaj-steps.component.css']
})
export class DodajStepsComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private servis: ProdavnicaService,
    private router: Router) { }

  tipFormGroup: FormGroup;
  opisFormGroup: FormGroup;
  kolicinaFormGroup: FormGroup;
  cenaFormGroup: FormGroup;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    this.tipFormGroup = this.fb.group({
      tip: ['', Validators.required]
    })
    this.opisFormGroup = this.fb.group({
      naziv: ['', Validators.required],
      zivotniVek: ['',Validators.min(1)],
      daniUbrzavanje: ['', Validators.min(1)]
    })
    this.kolicinaFormGroup = this.fb.group({
      kolicina: ['', Validators.min(1)]
    })
    this.cenaFormGroup = this.fb.group({
      cena: ['', Validators.min(1)]
    })
  }

  user: any;

  naziv: string;
  tip: string;
  zivotniVek: number;
  kolicina: number;
  cena: number;
  daniUbrzavanje: number;

  t() {
    this.tip = this.tipFormGroup.value.tip;
    console.log(this.tip)
  }

  opis() {
    
    this.naziv = this.opisFormGroup.value.naziv;
    if (this.tip == 'S') {
      this.zivotniVek = this.opisFormGroup.value.zivotniVek;
    } else {
      this.daniUbrzavanje = this.opisFormGroup.value.daniUbrzavanje;
    }
  }

  kol() {
    this.kolicina = this.kolicinaFormGroup.value.kolicina;
  }

  c() {
    this.cena = this.cenaFormGroup.value.cena;
    if(this.cena == null || this.cena <=0) return;
    console.log(this.kolicina)
    if(this.tip == 'S') {
      const sadnica = {
        naziv: this.naziv,
        proizvodjac: this.user.username,
        zivotniVek: this.zivotniVek,
        kolicina: this.kolicina,
        cena: this.cena,
        tip: this.tip
      }
      this.servis.dodajUProdavnicu(sadnica).subscribe(val=>{
        console.log(val);
        this.router.navigate(['/proizvodiPreduzece']);
      })
    }
    else {
      const preparat = {
        naziv: this.naziv,
        proizvodjac: this.user.username,
        daniUbrzavanje: this.daniUbrzavanje,
        kolicina: this.kolicina,
        cena: this.cena,
        tip: this.tip
      }
      this.servis.dodajUProdavnicu(preparat).subscribe(val=>{
        this.router.navigate(['/proizvodiPreduzece']);
     })
    }
  }
}

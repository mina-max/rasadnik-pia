import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './StartStrana/login/login.component';
import { RegistracijaComponent } from './StartStrana/registracija/registracija.component';
import { RegPreduzeceComponent } from './StartStrana/reg-preduzece/reg-preduzece.component';
import { PocetnaComponent } from './StartStrana/pocetna/pocetna.component';
import { RegPoljoprivrednikComponent } from './StartStrana/reg-poljoprivrednik/reg-poljoprivrednik.component';
import { AdminComponent } from './AdminStrana/admin/admin.component';
import { PoljoprivrednikComponent } from './PoljoprivrednikStrana/poljoprivrednik/poljoprivrednik.component';
import { PreduzeceComponent } from './PreduzeceStrana/preduzece/preduzece.component';
import { SifraComponent } from './PoljoprivrednikStrana/sifra/sifra.component';
import { DodajComponent } from './AdminStrana/dodaj/dodaj.component';
import { ObrisiComponent } from './AdminStrana/obrisi/obrisi.component';
import { DodajPoljComponent } from './AdminStrana/dodaj-polj/dodaj-polj.component';
import { DodajPredComponent } from './AdminStrana/dodaj-pred/dodaj-pred.component';
import { MagacinComponent } from './PoljoprivrednikStrana/magacin/magacin.component';
import { DodajRasadnikComponent } from './PoljoprivrednikStrana/dodaj-rasadnik/dodaj-rasadnik.component';
import { ProdavnicaComponent } from './PoljoprivrednikStrana/prodavnica/prodavnica.component';
import { ProizvodComponent } from './PoljoprivrednikStrana/proizvod/proizvod.component';
import { ProizvodiPreduzeceComponent } from './PreduzeceStrana/proizvodi-preduzece/proizvodi-preduzece.component';
import { DodajStepsComponent } from './PreduzeceStrana/dodaj-steps/dodaj-steps.component';
import { PoslovanjeComponent } from './PreduzeceStrana/poslovanje/poslovanje.component';
import { LozinkaComponent } from './PreduzeceStrana/lozinka/lozinka.component';
import { AzurirajPoljComponent } from './AdminStrana/azuriraj-polj/azuriraj-polj.component';
import { AzurirajPredComponent } from './AdminStrana/azuriraj-pred/azuriraj-pred.component';


const routes: Routes = [
  {path: '', component: PocetnaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registracija', component: RegistracijaComponent},
  {path: 'registracija/poljoprivrednik', component: RegPoljoprivrednikComponent},
  {path: 'registracija/preduzece', component: RegPreduzeceComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'poljoprivrednik', component: PoljoprivrednikComponent},
  {path: 'preduzece', component: PreduzeceComponent},
  {path: 'sifra', component: SifraComponent},
  {path: 'dodaj', component: DodajComponent},
  {path: 'obrisi', component: ObrisiComponent},
  {path: 'dodaj/poljoprivrednik', component: DodajPoljComponent},
  {path: 'dodaj/preduzece', component: DodajPredComponent},
  {path: 'magacin', component: MagacinComponent},
  {path: 'dodajRasadnik', component: DodajRasadnikComponent},
  {path: 'prodavnica', component: ProdavnicaComponent},
  {path: 'detaljnoProizvod', component: ProizvodComponent},
  {path: 'proizvodiPreduzece', component: ProizvodiPreduzeceComponent},
  {path: 'dodajProizvodPreduzece', component: DodajStepsComponent},
  {path: 'poslovanje', component: PoslovanjeComponent},
  {path:'lozinka', component: LozinkaComponent},
  {path: 'azurirajPolj', component: AzurirajPoljComponent},
  {path: 'azurirajPred', component: AzurirajPredComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

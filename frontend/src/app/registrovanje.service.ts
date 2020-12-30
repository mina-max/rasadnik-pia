import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrovanjeService {
 
  constructor(private http: HttpClient) { }

  uri = 'http://localhost:8080';

  zahtevPoljoprivrednik(ime, prezime, username, password, datumRodjenja, mestoRodjenja, telefon, email) {
    const user = {
      ime: ime,
      prezime: prezime,
      username: username,
      password: password,
      datumRodjenja: datumRodjenja,
      mestoRodjenja: mestoRodjenja,
      telefon: telefon,
      email:email
    };
    return this.http.post(`http://localhost:8080/signup/poljZahtev`, user);
  }
  
  zahtevPreduzece(ime, username, password, datumOsnivanja, mesto, email){
      const user = {
        ime: ime,
        username: username,
        password: password,
        datumOsnivanja: datumOsnivanja,
        mesto: mesto,
        email: email
      };
      return this.http.post(`http://localhost:8080/signup/predZahtev`, user);
  
  }

  dovuciPolj():Observable<any> {
    return this.http.post(`http://localhost:8080/admin/poljZahtev`, " ");
  }

  dovuciPred():Observable<any> {
    return this.http.post(`http://localhost:8080/admin/predZahtev`, " ");
  }

  dovuciPoljKor():Observable<any> {
    return this.http.post(`http://localhost:8080/admin/poljKor`, " ");
  }

  dovuciPredKor():Observable<any> {
    return this.http.post(`http://localhost:8080/admin/predKor`, " ");
  }

  prihvatiPolj(user):Observable<any> {
    return this.http.post(`http://localhost:8080/signup/poljoprivrednik`, user);
  }
  
  prihvatiPred(user): Observable<any>{
    return this.http.post(`http://localhost:8080/signup/preduzece`, user);
  }

  obrisiPolj(user) {
    return this.http.post(`http://localhost:8080/admin/poljObrisi`, user);
  }

  obrisiPred(user) {
    return this.http.post(`http://localhost:8080/admin/predObrisi`, user);
  }

  obrisiPoljKor(user) {
    return this.http.post(`http://localhost:8080/admin/poljKorObrisi`, user);
  }

  obrisiPredKor(user) {
    return this.http.post(`http://localhost:8080/admin/predKorObrisi`, user);
  }

  dodajPoljoprivrednika(ime, prezime, username, password, datumRodjenja, mestoRodjenja, telefon, email) {
    const user = {
      ime: ime,
      prezime: prezime,
      username: username,
      password: password,
      datumRodjenja: datumRodjenja,
      mestoRodjenja: mestoRodjenja,
      telefon: telefon,
      email:email
    };
    return this.http.post(`http://localhost:8080/signup/dodajPolj`, user);
  }

  dodajPreduzece(ime, username, password, datumOsnivanja, mesto, email){
    const user = {
      ime: ime,
      username: username,
      password: password,
      datumOsnivanja: datumOsnivanja,
      mesto: mesto,
      email: email
    };
    console.log(user)
    return this.http.post(`http://localhost:8080/signup/dodajPred`, user);

}

azurirajPreduzece(ime: string, username: string, mesto: string, email: string) {
  const user = {
    ime: ime,
    username: username,
    mesto: mesto,
    email: email
  }
  return this.http.post(`http://localhost:8080/signup/azurirajPred`, user);
}

azurirajPoljoprivrednik(ime: string, prezime:string, username: string, telefon: string,email: string) {
  const user = {
    ime: ime,
    prezime: prezime,
    username: username,
    telefon: telefon,
    email: email
  }
  return this.http.post(`http://localhost:8080/signup/azurirajPolj`, user);
}









}



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdavnicaService {
  
  
  constructor(private http: HttpClient) { }


  dovuciPreparate():Observable<any> {
    return this.http.post(`http://localhost:8080/prodavnica/dovuciPreparate`, "");
  }
  dovuciSadnice():Observable<any> {
    return this.http.post(`http://localhost:8080/prodavnica/dovuciSadnice`, "");
  }

  dovuciKomentare(proizvod):Observable<any> {
    return this.http.post(`http://localhost:8080/prodavnica/dovuciKomentare`, proizvod);
  }

  dodajKomentar(kom):Observable<any> {
    return this.http.post(`http://localhost:8080/prodavnica/dodajKomentar`, kom);
  }

  naruci(narudzbina):Observable<any> {
    return this.http.post(`http://localhost:8080/prodavnica/naruci`, narudzbina);
  }

  dovuciNarudzbine(user) {
    return this.http.post(`http://localhost:8080/prodavnica/dovuciNarudzbine`, user);
  }

  odbijNarudzbinu(narudzbina) {
    return this.http.post(`http://localhost:8080/prodavnica/odbijNarudzbinu`, narudzbina);
  }
 
  mestoPreduzeca(user):Observable<any> {
    return this.http.post(`http://localhost:8080/prodavnica/mestoPreduzeca`, user);
  }
  
  promeniKurire(user, kuriri) {
    const u = {
      user: user,
      kuriri: kuriri
    }
    return this.http.post(`http://localhost:8080/prodavnica/promeniKurire`, u);
  }

  promeniStatusUToku(narudzbina,status,time) {
    const nar = {
      narudzbina: narudzbina,
      status: status,
      time: time,
    }
    return this.http.post(`http://localhost:8080/prodavnica/promeniStatusUToku`, nar);
  }

 /* promeniStatusIsporucena(narudzbina,status,time) {
    const nar = {
      narudzbina: narudzbina,
      status: status,
    }
    return this.http.post(`http://localhost:8080/prodavnica/promeniStatusIsporucena`, nar);
  }*/

  dovuciIdPoslednjePorudzbine(user):Observable<any> {
    return this.http.post(`http://localhost:8080/prodavnica/dovuciIdPoslednjePorudzbine`, user);
  }
 
  
  promeniIdPoslednjePorudzbine(user, idPoslednjePorudzbine):Observable<any> {
    const data = {
      user: user,
      idPoslednjePorudzbine: idPoslednjePorudzbine
    }
    return this.http.post(`http://localhost:8080/prodavnica/promeniIdPoslednjePorudzbine`, data);
  }

  promeniStatus(artikal) {
    return this.http.post(`http://localhost:8080/prodavnica/promeniStatus`, artikal);
  }
  

  dovuciSadnicePreduzece(preduzece):Observable<any> {
    return this.http.post('http://localhost:8080/prodavnica/dovuciSadnicePreduzece', preduzece);
  }
  dovuciPreparatePreduzece(preduzece):Observable<any> {
    return this.http.post('http://localhost:8080/prodavnica/dovuciPreparatePreduzece', preduzece);
  }

  dodajUProdavnicu(proizvod) {
    return this.http.post('http://localhost:8080/prodavnica/dodajUProdavnicu', proizvod);

  }

  povuciProizvod(proizvod) {
    return this.http.post('http://localhost:8080/prodavnica/povuciProizvod', proizvod);
  }
  
  

   
}

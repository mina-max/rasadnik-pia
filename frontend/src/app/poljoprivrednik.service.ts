import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoljoprivrednikService {
   
  
  constructor(private http: HttpClient) { }

  dovuciRasadnike(username): Observable<any> {
    const user = {
      username: username
    }

    return this.http.post(`http://localhost:8080/poljoprivrednik/rasadnici`, user);

  }

  dovuciSadnice(rasadnik): Observable<any> {
    return this.http.post(`http://localhost:8080/poljoprivrednik/sadnice`, rasadnik);
  }

  dovuciSadniceMagacin(rasadnik): Observable<any> {
    return this.http.post(`http://localhost:8080/poljoprivrednik/magacinSadnice`, rasadnik);
  }

  dovuciPreparateMagacin(rasadnik):Observable<any> {
    return this.http.post(`http://localhost:8080/poljoprivrednik/magacinPreparati`, rasadnik);
  }

  dodajSadnicu(sadnica): Observable<any>{
    return this.http.post(`http://localhost:8080/poljoprivrednik/dodajSadnicu`, sadnica);
  }

  promeni(selRasadnik): Observable<any> {
    console.log(selRasadnik);
    return this.http.post(`http://localhost:8080/poljoprivrednik/promeni`, selRasadnik);
    
  }

  ostari():Observable<any> {
    return this.http.post(`http://localhost:8080/poljoprivrednik/ostari`, "");
  }

  promeniSvima():Observable<any> {
    return this.http.post(`http://localhost:8080/poljoprivrednik/promeniSvima`, "");
  }

  dodajRasadnik(rasadnik):Observable<any> {
    return this.http.post(`http://localhost:8080/poljoprivrednik/dodajRasadnik`, rasadnik);
  }

  dodajPreparat(sadnicaZaPreparat, preparat) {
    const data = {
      sadnicaZaPreparat: sadnicaZaPreparat,
      preparat: preparat
    }
    return this.http.post(`http://localhost:8080/poljoprivrednik/dodajPreparat`, data);
  }

  ukloniSadnicu(sadnica) {
    return this.http.post(`http://localhost:8080/poljoprivrednik/ukloniSadnicu`, sadnica);
  }

  apdejtujCekanje(rasadnik) {
    return this.http.post(`http://localhost:8080/poljoprivrednik/apdejtujCekanje`, rasadnik);
  }

  dovuciNarudzbinePreparati(rasadnik):Observable<any> {
    return this.http.post(`http://localhost:8080/poljoprivrednik/dovuciNarudzbinePreparati`, rasadnik);
  }
  dovuciNarudzbineSadnice(rasadnik):Observable<any> {
    return this.http.post(`http://localhost:8080/poljoprivrednik/dovuciNarudzbineSadnice`, rasadnik);
  }

  otkazi(narudzbina):Observable<any> {
    return this.http.post(`http://localhost:8080/poljoprivrednik/otkazi`, narudzbina);
  }
  
  

  
  
 

}

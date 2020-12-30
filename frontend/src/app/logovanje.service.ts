import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class LogovanjeService {

  uri = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(username, password): Observable<any> {
    const user = {
      username: username,
      password: password
    };
    return this.http.post(`http://localhost:8080/login`, user);
  
  }

  promenaSifre(username, oldPass, newPass):Observable<any>{
    const user = {
      username: username,
      oldPass: oldPass,
      newPass: newPass
    }
    return this.http.post(`http://localhost:8080/poljoprivrednik/promenaSifre`, user)
  }




}

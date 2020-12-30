import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreduzeceService {
 
  API = "5wiiyMI5o1oRMnRt0ndL3A2BYc_R1pmPSsS4eeXctnI";

  constructor(private http: HttpClient) { }

  getLoc(grad):Observable<any>{
    return this.http.get('https://geocode.search.hereapi.com/v1/geocode?q='+grad+'&apiKey=5wiiyMI5o1oRMnRt0ndL3A2BYc_R1pmPSsS4eeXctnI')
  }
  
  getTime(lat1, lng1, lat2, lng2):Observable<any> {
    console.log(lat1);
    return this.http.get('https://route.ls.hereapi.com/routing/7.2/calculateroute.json?apiKey=5wiiyMI5o1oRMnRt0ndL3A2BYc_R1pmPSsS4eeXctnI&waypoint0=geo!'+lat1+','+lng1+'&waypoint1=geo!'+lat2+','+lng2+'&mode=fastest;car;traffic:disabled')
  }

  


}

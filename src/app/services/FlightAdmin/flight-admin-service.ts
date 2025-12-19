import { Injectable } from '@angular/core';
import { Flight } from '../../models/Flight';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FlightAdminService {
  constructor(private readonly http:HttpClient){}
  
  flightAdd(flight:Flight):Observable<Flight>{
    return this.http.post<Flight>('http://localhost:8765/flight-service/flight/register',flight,{withCredentials:true});
  }
}

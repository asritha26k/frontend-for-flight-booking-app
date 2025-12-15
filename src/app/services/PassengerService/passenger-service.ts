import { Injectable } from '@angular/core';
import { Profile } from '../../models/Passenger';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PassengerService {

  private readonly BASE_URL =
    'http://localhost:8765/passenger-service/passenger';

  constructor(private readonly http: HttpClient) {}

  registerPassenger(profile: Profile) {
    return this.http.post<number>(
      `${this.BASE_URL}/register`,
      profile,
      { withCredentials: true }
    );
  }

  getPassengerByUserId(authUserId: number) {
    return this.http.get<Profile>(
      `${this.BASE_URL}/getByPassengerId/${authUserId}`,
      { withCredentials: true }
    );
  }

  getPassengerByEmail(email: string) {
    return this.http
      .get<number>(
        `${this.BASE_URL}/getPassengerIdByEmail/${email}`,
        { withCredentials: true }
      )
      .pipe(
        switchMap(id => this.getPassengerByUserId(id))
      );
  }
}

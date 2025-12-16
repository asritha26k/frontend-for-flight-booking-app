import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { FlightService } from '../../services/FlightService/flight-service';
import { Flight } from '../../models/Flight';
import { searchReq } from '../../models/searchRequest';
import { AuthService } from '../../services/Authentication/auth-service';
import { PassengerService } from '../../services/PassengerService/passenger-service';
import { take, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './flight-list.html',
  styleUrl: './flight-list.css',
})
export class FlightList {

  @Input() flights: Flight[] | null = [];

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly passengerService: PassengerService
  ) {}

  SendFlightId(flight: Flight) {
  console.log('book ticket clicked');
  const flightId = flight.flightId;

  this.authService.currentUser
    .pipe(
      take(1),
      switchMap(user => {
        if (!user?.email) {
          this.router.navigate(['/signin']);
          throw new Error('User not logged in');
        }

        // email → passengerId (number)
        return this.passengerService.getPassengerIdByEmail(user.email);
      })
    )
    .subscribe({
      next: passengerId => {
        console.log('Passenger ID found:', passengerId);

        // passenger exists → go to booking page
        this.router.navigate(['/book'], {
          state: { flightId }
        });
      },
      error: err => {
        // passenger not registered
        if (err.status === 404) {
          this.router.navigate(['/register']);
        } else {
          console.error(err);
        }
      }
    });
}

}

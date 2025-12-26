import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { take } from 'rxjs';

import { Flight } from '../../models/Flight';
import { AuthService } from '../../services/Authentication/auth-service';
import { BookingStateService } from '../../services/BookingState/BookingStateService';

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
    private readonly bookingState: BookingStateService
  ) {}

sendFlightId(flight: Flight) {
  const flightId = flight.flightId;

  if (flightId == null) {
    console.error('Flight ID missing');
    return;
  }

  this.authService.currentUser
    .pipe(take(1))
    .subscribe(user => {
      if (!user) {
        this.router.navigate(['/signin']);
        return;
      }

      this.bookingState.setFlightId(flightId); 

      this.router.navigate(['/passenger-add']);
    });
}

}

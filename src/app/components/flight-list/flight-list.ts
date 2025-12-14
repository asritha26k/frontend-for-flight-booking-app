import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { FlightService } from '../../services/flight-service';
import { Flight } from '../../models/Flight';
import { searchReq } from '../../models/searchReq';
import { AuthService } from '../../services/auth-service';
import { PassengerService } from '../../services/passenger-service';
import { take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './flight-list.html',
  styleUrl: './flight-list.css',
})
export class FlightList implements OnInit {

  flights$!: Observable<Flight[]>;

  searchData!: searchReq;

  constructor(
    private readonly flightService: FlightService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly passengerService: PassengerService
  ) {}

  ngOnInit(): void {
    const state = history.state;

    if (!state?.searchData) {
      this.router.navigate(['/']);
      return;
    }

    this.searchData = state.searchData;

    
    this.flights$ = this.flightService.getFlightByOriginAndDestination(
      this.searchData
    );
  }

  SendFlightId(flightId: string) {
    this.authService.currentUser
      .pipe(
        take(1),
        switchMap(user => {
          if (!user?.id) {
            this.router.navigate(['/']);
            throw new Error('No user');
          }
          return this.passengerService.getPassengerByAuthUserId(user.id);
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/book'], {
            state: { flightId }
          });
        },
        error: err => {
          if (err.status === 404) {
            this.router.navigate(['/register']);
          } else {
            console.error(err);
          }
        }
      });
  }
}

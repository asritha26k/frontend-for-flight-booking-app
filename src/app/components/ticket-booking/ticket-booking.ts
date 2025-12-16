import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Observable,
  Subject,
  switchMap,
  take,
  startWith
} from 'rxjs';

import { TicketService } from '../../services/TicketService/ticket-service';
import { Ticket } from '../../models/Ticket';
import { AuthService } from '../../services/Authentication/auth-service';
import { PassengerService } from '../../services/PassengerService/passenger-service';

@Component({
  selector: 'app-ticket-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-booking.html',
  styleUrl: './ticket-booking.css',
})
export class TicketBooking implements OnInit {

  tickets$!: Observable<Ticket[]>;
  private refresh$ = new Subject<void>();

  flightId!: number;
  passengerId!: number;
  passengerEmail!:string;
  seatNo!: string;

  constructor(
    private readonly ticketService: TicketService,
    private readonly authService: AuthService,private readonly passengerService:PassengerService
  ) {}

ngOnInit(): void {
  this.flightId = history.state?.flightId;
  console.log('Flight ID:', this.flightId);

  this.tickets$ = this.refresh$.pipe(
    startWith(void 0),
    switchMap(() =>
      this.authService.currentUser.pipe(
        take(1),
        switchMap(user => {
          if (!user) {
            throw new Error('User not logged in');
          }

          this.passengerEmail = user.email;
          return this.ticketService.getTicketsByEmail(user.email);
        })
      )
    )
  );
}
bookTicket() {
  this.authService.currentUser.pipe(
    take(1),
    switchMap(user => {
      if (!user) {
        throw new Error('User not logged in');
      }

      // email → passengerId
      return this.passengerService.getPassengerIdByEmail(user.email);
    }),
    switchMap(passengerId => {
      console.log('Passenger ID:', passengerId);

      return this.ticketService.bookTicketByPassengerIdandFlightId(
        this.flightId,
        passengerId,
        this.seatNo
      );
    })
  ).subscribe({
    next: () => {
      console.log('Ticket booked');
      this.seatNo = '';
      this.refresh$.next();
    },
    error: err => console.error('Booking failed', err),
  });
}


}

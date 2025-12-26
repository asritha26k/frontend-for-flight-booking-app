import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subject, switchMap, take, startWith } from 'rxjs';
import { map } from 'rxjs/operators';
import { TicketList } from '../ticket-list/ticket-list';
import { TicketService } from '../../services/TicketService/ticket-service';
import { Ticket } from '../../models/Ticket';
import { AuthService } from '../../services/Authentication/auth-service';
import { Router } from '@angular/router';
import { searchingStateService } from '../../services/SavingStates/searchingStateService';
import { BookingStateService } from '../../services/BookingState/BookingStateService';

@Component({
  selector: 'app-ticket-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, TicketList],
  templateUrl: './ticket-booking.html',
  styleUrl: './ticket-booking.css',
})
export class TicketBooking implements OnInit {

  tickets$!: Observable<Ticket[]>;
  private refresh$ = new Subject<void>();

  ticketBookedMessage$ = new Subject<string>();

  flightId!: number;
  passengerIds: number[] = [];

  constructor(
    private readonly ticketService: TicketService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly bookingState: BookingStateService,
    private readonly searchingState: searchingStateService
  ) {}

  ngOnInit(): void {
    const flightId = this.bookingState.getFlightId();
    const passengerIds = this.bookingState.getPassengerIds();

    if (flightId === null || passengerIds.length === 0) {
      this.router.navigate(['/']);
      return;
    }

    this.flightId = flightId;
    this.passengerIds = passengerIds;

  this.tickets$ = this.refresh$.pipe(
  startWith(void 0),
  switchMap(() =>
    this.authService.currentUser.pipe(
      take(1),
      switchMap(user => {
        if (!user) throw new Error('User not logged in');
        return this.ticketService.getTicketsByEmail(user.email);
      })
    )
  ),
  map((tickets: Ticket[] | null) => tickets ?? [])
);


  }

  bookTicket() {
  this.ticketService.bookTicket({
    flightId: this.flightId,
    passengerIds: this.passengerIds
  }).subscribe({
    next: (pnr: string) => {
      this.searchingState.clear();
      this.bookingState.reset();
      this.ticketBookedMessage$.next(`Ticket booked successfully. PNR: ${pnr}`);
      this.refresh$.next();
    },
    error: (err) => {
      this.ticketBookedMessage$.next(err);
    }
  });
}

  onTicketCancelled() {
    this.refresh$.next();
  }
}

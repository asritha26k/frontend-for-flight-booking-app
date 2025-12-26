import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Ticket } from '../../models/Ticket';
import { TicketService } from '../../services/TicketService/ticket-service';
import { AuthService } from '../../services/Authentication/auth-service';
import { take } from 'rxjs';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css',
})
export class TicketList implements  OnInit, OnChanges{

  @Input() tickets: Ticket[] = [];
  @Output() ticketCancelled = new EventEmitter<number>();

  displayedTickets: Ticket[] = [];
  private selectedTicket?: Ticket;

  constructor(
    private ticketService: TicketService,
    private authService: AuthService
  ) {}
ngOnChanges(changes: SimpleChanges): void {
  if (changes['tickets'] && this.tickets.length > 0) {
    this.displayedTickets = this.tickets;
  }
}
  ngOnInit(): void {
    // Case 1: Parent passed tickets
    if (this.tickets.length > 0) {
      this.displayedTickets = this.tickets;
      return;
    }

    // Case 2: No input → fetch by logged-in user's email
    this.authService.currentUser
      .pipe(take(1))
      .subscribe(user => {
        if (!user?.email) return;

        this.ticketService
          .getTicketsByEmail(user.email)
          .pipe(take(1))
          .subscribe({
            next: tickets => {
              this.displayedTickets = tickets;
            },
            error: err => {
              console.error('Failed to load tickets', err);
            }
          });
      });
  }

  get sortedTickets(): Ticket[] {
    return [...this.displayedTickets].sort((a, b) => {
      if (a.booked !== b.booked) {
        return a.booked ? 1 : -1;
      }
      return (
        new Date(b.departureTime).getTime() -
        new Date(a.departureTime).getTime()
      );
    });
  }

  openCancelModal(ticket: Ticket): void {
    this.selectedTicket = ticket;
  }

  isCancelDisabled(ticket: Ticket): boolean {
    const hoursLeft =
      (new Date(ticket.departureTime).getTime() - Date.now()) / (1000 * 60 * 60);
    return hoursLeft < 24;
  }

  confirmCancel(): void {
    if (!this.selectedTicket) return;
    this.ticketCancelled.emit(this.selectedTicket.id);
    this.selectedTicket = undefined;
  }
}

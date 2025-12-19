import { Component, Input, OnChanges, OnInit,OnDestroy } from '@angular/core';
import { Observable, of, switchMap, take } from 'rxjs';
import { Ticket } from '../../models/Ticket';
import { TicketService } from '../../services/TicketService/ticket-service';
import { AuthService } from '../../services/Authentication/auth-service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css',
  imports:[ AsyncPipe, DatePipe]
})
export class TicketList implements OnInit, OnChanges, OnDestroy {

  @Input() tickets: Ticket[] | null = null;

  tickets$!: Observable<Ticket[]>;

  constructor(
    private readonly ticketService: TicketService,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    if (!this.tickets) {
      this.tickets$ = this.authService.currentUser.pipe(
        take(1),
        switchMap(user => {
          if (!user?.email) throw new Error('User not logged in');
          return this.ticketService.getTicketsByEmail(user.email);
        })
      );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tickets'] && this.tickets) {
      this.tickets$ = of(this.tickets);
    }
  }
  ngOnDestroy(): void {
  console.log('TicketList component destroyed');
}
}

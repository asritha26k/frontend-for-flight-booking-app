import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { PassengerRegistration } from '../passenger-registration/passenger-registration';
import { PassengerService } from '../../services/PassengerService/passenger-service';
import { Router } from '@angular/router';
import { BookingStateService } from '../../services/BookingState/BookingStateService';

@Component({
  selector: 'app-passenger-add',
  standalone: true,
  imports: [CommonModule, FormsModule, PassengerRegistration],
  templateUrl: './passenger-add.html',
})
export class PassengerAdd  implements OnInit{
 
ngOnInit() {
  const flightId = this.bookingState.getFlightId();

  if (flightId === null) {
    console.error('Flight ID missing');
    this.router.navigate(['/']);
    return;
  }

  this.flightId = flightId;
}

  flightId!: number;  
  count = 2;
  passengersData: any[] = [];

  constructor(
    private passengerService: PassengerService,
    private bookingState: BookingStateService,
    private router: Router
  ) {}

  get passengers(): number[] {
    return Array.from({ length: this.count });
  }

  onPassengerChange(index: number, data: any) {
    this.passengersData[index] = data;
  }

registerAll() {
  console.log(this.passengersData);

  if (this.passengersData.length !== this.count) {
    console.log('Not all passengers emitted yet');
    return;
  }

  const requests = this.passengersData.map(p =>
    this.passengerService.createOrGetPassenger(p)
  );

  forkJoin(requests).subscribe({
    next: (passengerIds) => {
      console.log('forkJoin success', passengerIds);

      this.bookingState.setFlightId(this.flightId);
      this.bookingState.setPassengerIds(passengerIds);

      this.router.navigate(['/book']);
    },
    error: err => {
      console.error('forkJoin error', err);
    },
    complete: () => {
      console.log('forkJoin completed');
    }
  });
}

}

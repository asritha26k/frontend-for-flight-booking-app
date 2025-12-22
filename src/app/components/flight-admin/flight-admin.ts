import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlightAdminService } from '../../services/FlightAdmin/flight-admin-service';
import { Flight } from '../../models/Flight';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-admin',
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule],
  standalone: true,
  templateUrl: './flight-admin.html',
  styleUrl: './flight-admin.css',
})
export class FlightAdmin implements OnInit {
  minDate!: string;
  flights$!: Observable<Flight[]>;
  airlines = ['INDIGO', 'AIRINDIA', 'EMIRATES', 'SPICEJET'];
  selectedFlightId: number | undefined;

  private refresh$ = new BehaviorSubject<void>(undefined);

  constructor(private readonly flightAdmin: FlightAdminService) {}

  ngOnInit() {
    this.minDate = new Date().toISOString().split('T')[0];

    this.flights$ = this.refresh$.pipe(
      switchMap(() => this.flightAdmin.getAllFlights())
    );
    //test values
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const futureDate = tomorrow.toISOString().split('T')[0];
const future = new Date();
future.setDate(future.getDate() + 7);
const futureDateArrival = future.toISOString().split('T')[0];
    this.form.patchValue({
  airline: 'INDIGO',
  origin: 'Hyderabad',
  destination: 'Bangalore',
  price: 4500,
  departureDate: futureDate,
  departureTime: '10:30',
  arrivalDate: futureDateArrival,
  arrivalTime: '12:00',
  totalSeats: 180
});
  }

  form = new FormGroup({
    airline: new FormControl('INDIGO', [Validators.required]),
    origin: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),
    destination: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),
    price: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]+$')]),
    departureDate: new FormControl('', Validators.required),
    departureTime: new FormControl('', Validators.required),
    arrivalDate: new FormControl('', Validators.required),
    arrivalTime: new FormControl('', Validators.required),
    totalSeats: new FormControl(0, Validators.required)
  });

  register() {
    const newFlight: Flight = {
      airline: this.form.value.airline!,
      origin: this.form.value.origin!,
      destination: this.form.value.destination!,
      price: this.form.value.price!,
      departureTime:
        this.form.value.departureDate! + 'T' + this.form.value.departureTime! + ':00',
      arrivalTime:
        this.form.value.arrivalDate! + 'T' + this.form.value.arrivalTime! + ':00',
      totalSeats: this.form.value.totalSeats ?? 0
    };

    this.flightAdmin.flightAdd(newFlight).subscribe({
      next: () => {
        console.log('flight registered');
        this.refresh$.next();
      },
      error: () => console.log('error in registering flight')
    });

    this.form.reset({
      departureDate: this.minDate,
      arrivalDate: this.minDate
    });
  }

  DeleteById(id: number | undefined) {
    if (id === undefined) return;

    this.flightAdmin.deleteFlightById(id).subscribe({
      next: () => {
        console.log(id, 'flight got deleted');
        this.refresh$.next();
      },
      error: () => console.log('error in deleting the flights')
    });
  }

  confirmDelete() {
    if (this.selectedFlightId !== undefined) {
      this.DeleteById(this.selectedFlightId);
      this.selectedFlightId = undefined;
    }
  }
}

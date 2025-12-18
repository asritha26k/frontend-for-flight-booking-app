import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { searchReq } from '../../models/searchRequest';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Flight } from '../../models/Flight';
import { FlightService } from '../../services/FlightService/flight-service';
import { FlightList } from '../flight-list/flight-list';
import { originDestinationDifferent } from '../../validatorFunctions/originDestinationDifferent';
@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule,CommonModule,FlightList],
  standalone:true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  flights$?: Observable<Flight[]>;
  minDate!: string;
  constructor(private readonly flightService: FlightService) {}
  
  ngOnInit() {
    this.minDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  }

 req: searchReq = {
  origin: '',
  destination: '',
  departureDateTime: ''
};
form = new FormGroup(
  {
    origin: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z ]+$')
    ]),
    destination: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z ]+$')
    ]),
    departureDate: new FormControl('',[
      Validators.required
    ]

    )
  },
  { validators: originDestinationDifferent }
);
onSubmit() {
   const date = this.form.value.departureDate; 
   this.req = {
    origin: this.form.value.origin!.trim().toLowerCase(),
    destination: this.form.value.destination!.trim().toLowerCase(),
    departureDateTime: date + 'T00:00:00'
  };
  console.log(this.req);
  this.flights$ = this.flightService
      .getFlightByOriginAndDestination(this.req);
}

}

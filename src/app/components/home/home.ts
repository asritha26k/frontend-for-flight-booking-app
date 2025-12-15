import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { searchReq } from '../../models/searchRequest';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Flight } from '../../models/Flight';
import { FlightService } from '../../services/FlightService/flight-service';
import { FlightList } from '../flight-list/flight-list';
@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule,CommonModule,FlightList],
  standalone:true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  flights$?: Observable<Flight[]>;

  constructor(private readonly flightService: FlightService) {}

 req: searchReq = {
  origin: '',
  destination: ''
};
form=new FormGroup(
  {
origin: new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z ]+$')]),
destination:new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z ]+$')])

  }

);
onSubmit() {
  this.req.origin=this.form.value.origin!;
  this.req.destination=this.form.value.destination!;
  this.flights$ = this.flightService
      .getFlightByOriginAndDestination(this.req);
}

}

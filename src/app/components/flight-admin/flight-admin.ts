import { Component } from '@angular/core';
import { FormControl,FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { FlightAdminService } from '../../services/FlightAdmin/flight-admin-service';
import { Flight } from '../../models/Flight';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-flight-admin',
  imports: [ReactiveFormsModule,AsyncPipe],
  templateUrl: './flight-admin.html',
  styleUrl: './flight-admin.css',
})
export class FlightAdmin {
  constructor(private flightAdmin:FlightAdminService){}
  presentFlight$!: Observable<Flight>;
  flight:Flight={
    airline:'',
    origin:'',
    destination:'',
    price:0,
    departureTime:'',
    arrivalTime:''
  }
   form=new FormGroup(
    {
      airline: new FormControl('',Validators.required),
      origin: new FormControl('',Validators.required),
      destination:new FormControl('',Validators.required),
      price:new FormControl(0,Validators.required),
      departureDate:new FormControl('',Validators.required),
      departureTime:new FormControl('',Validators.required),
      arrivalTime:new FormControl('',Validators.required),
      arrivalDate:new FormControl('',Validators.required)
    }
    
    
   )
   register(){
      console.log("flight registered");
      this.flight.airline=this.form.value.airline!;
      this.flight.origin=this.form.value.origin!;
      this.flight.destination=this.form.value.destination!;
      this.flight.price=this.form.value.price!;
      this.flight.departureTime=this.form.value.departureDate!+'T'+this.form.value.departureTime!+':00';
      this.flight.arrivalTime=this.form.value.arrivalDate!+'T'+this.form.value.arrivalTime!+':00';
      this.presentFlight$ = this.flightAdmin.flightAdd(this.flight);
      this.form.reset();
    }
}

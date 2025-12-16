import { Component } from '@angular/core';
import { PassengerService } from '../../services/PassengerService/passenger-service';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-passenger-registration',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule,CommonModule ],
  templateUrl: './passenger-registration.html',
  styleUrl: './passenger-registration.css',
})
export class PassengerRegistration {

  constructor(
    private readonly passengerService: PassengerService,
    private readonly router: Router
  ) {}
  // constructor() {
  //   console.log('PassengerRegistration loaded');
  // }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    houseNo: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
  });

  register() {
    const profile = {
      name: this.form.value.name!,
      phoneNumber: this.form.value.phoneNumber!,
      email: this.form.value.email!,
      houseNo: this.form.value.houseNo!,
      city: this.form.value.city!,
      state: this.form.value.state!,
    };

    console.log('Register payload:', profile);

    this.passengerService.registerPassenger(profile).subscribe({
      next: (id) => {
        console.log('Passenger registered with id:', id);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Registration failed', err);
      }
    });
  }
}

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-passenger-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './passenger-registration.html',
})
export class PassengerRegistration implements OnInit {

  @Input() index!: number;
  @Output() passengerChange = new EventEmitter<any>();

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    houseNo: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
  });

 ngOnInit() {

  if (this.index === 0) {
    this.form.patchValue({
      name: 'Sritha',
      email: 'sritha@gmail.com',
      phoneNumber: '9999999999',
      houseNo: '12A',
      city: 'Hyderabad',
      state: 'Telangana'
    });
  }

  if (this.index === 1) {
    this.form.patchValue({
      name: 'Ritha',
      email: 'ritha@gmail.com',
      phoneNumber: '8888888888',
      houseNo: '34B',
      city: 'Bangalore',
      state: 'Karnataka'
    });
  }

  if (this.form.valid) {
    this.passengerChange.emit(this.form.value);
  }

  this.form.valueChanges.subscribe(() => {
    if (this.form.valid) {
      this.passengerChange.emit(this.form.value);
    }
  });
}

}

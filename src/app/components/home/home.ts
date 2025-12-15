import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { searchReq } from '../../models/searchReq';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  standalone:true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
 constructor(private readonly router:Router){}
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
  this.router.navigate(['/flights'], {
    state:{
      searchData:{
        origin:this.req.origin,
        destination:this.req.destination
        
      }
    }
  });
}

}

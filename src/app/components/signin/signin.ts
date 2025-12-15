import { Component } from '@angular/core';
import { user } from '../../models/user';
import { AuthService } from '../../services/Authentication/auth-service';
import { FormControl, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { usernameValidator } from '../../validatorFunctions/usernameValidator';
import { passwordValidator } from '../../validatorFunctions/passwordValidator';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule,AsyncPipe],
  standalone:true,
  templateUrl: './signin.html',
  styleUrls: ['./signin.css'],
})

export class Signin {
 constructor(private readonly auth:AuthService,private readonly router:Router){}
  user:user={
    username:"",
    password:""
  }
    error$!: Observable<string | null>;
  
  ngOnInit() {
  this.auth.clearError();
  this.error$ = this.auth.error$;
}

form = new FormGroup({
  username: new FormControl('', [
    Validators.required,
    usernameValidator
  ]),
  password:new FormControl('',[
    Validators.required,passwordValidator
  ]

  )
});  
  submit(){
    this.user.username=this.form.value.username!;
    this.user.password=this.form.value.password!;
  this.auth.signin(this.user).subscribe({
next:()=>{console.log('Signin succesful');
  this.router.navigate(['/']);
},
error:(err)=>{
  console.error('Sign in failed:',err.message);
 // this.router.navigate(['/signup'])

}
  }
  );
}
}




import { Component, OnInit } from '@angular/core';
import { user } from '../../models/user';
import { AuthService } from '../../services/Authentication/auth-service';
import { FormControl, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { usernameValidator } from '../../validatorFunctions/usernameValidator';
import { passwordValidator } from '../../validatorFunctions/passwordValidator';
import { filter, map, Observable, of, startWith, switchMap, timer } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ChangePassword } from "../change-password/change-password";

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, AsyncPipe, RouterModule, ChangePassword, CommonModule],
  standalone:true,
  templateUrl: './signin.html',
  styleUrls: ['./signin.css'],
})

export class Signin implements OnInit{
  passwordExpired$!: Observable<boolean>;
 constructor(private readonly auth:AuthService,private readonly router:Router,private readonly route:ActivatedRoute){}
  user:user={
    username:"",
    password:""
  }
    error$!: Observable<string | null>;
    
  signedin$!:Observable<string | null>;
  passwordChanged$!:Observable<string | null>;
ngOnInit() {

  this.passwordExpired$ = this.auth.passwordExpiredState$;
  this.auth.clearError();
   this.error$ = this.auth.error$.pipe(
    filter(error => !!error), 
    switchMap(error =>
      timer(3000).pipe(
        map(() => null), 
        startWith(error)  
      )
    )
  );

  this.signedin$ = this.route.queryParamMap.pipe(
    map(params => params.get('signedin')),
    filter(value => value === 'success'),  
    switchMap(value =>//timer is an observable that emits after 3sec, switchmap is the one which subscribes to it
      timer(3000).pipe(
        map(() => null),                    
        startWith(value)               
      )
    )
  );
  

  this.passwordChanged$ = this.route.queryParamMap.pipe(
    map(params => params.get('passwordChanged')),
    filter(value => value === 'success'),  
    switchMap(value =>
      timer(3000).pipe(
        map(() => null),                    
        startWith(value)               
      )
    )
  );
}

form = new FormGroup({
  username: new FormControl('', [
    Validators.required,
    usernameValidator
  ]),
  password:new FormControl('',[
    Validators.required
  ]

  )
});  

submit() {
  this.user.username = this.form.value.username!;
  this.user.password = this.form.value.password!;

  this.auth.signin(this.user).subscribe({
    next: (res) => {
      console.log(res,"this is the result after sign in ");
      const result = this.auth.handleSignInResponse(res);
      //this.router.navigate([result.redirect]);
    }
  });
}
onPasswordUpdated() {
  // Just hide modal. Navigation handled by ChangePassword after signout
  this.auth.setPasswordExpired(false);
}

onCloseModal() {
  this.auth.setPasswordExpired(false);
  this.router.navigate(['/signin']);
}
}




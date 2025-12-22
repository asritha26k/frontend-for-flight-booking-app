import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/Authentication/auth-service';
import { filter, map, Observable, startWith, switchMap, timer } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule,AsyncPipe ],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
   error$!: Observable<string | null>;
   
  constructor(private readonly auth:AuthService,private readonly router:Router){};
  ngOnInit() {
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
  }
  form= new FormGroup({
    oldPassword: new FormControl('',[
      Validators.required
    ]
    ),
    newPassword:new FormControl('',[
      Validators.required
    ])
  }
  )
  payload:{
    oldPassword:string,
    newPassword:string
  }={
    oldPassword:'',
    newPassword:''
  }

  change(){
    this.payload.oldPassword=this.form.value.oldPassword!;
    this.payload.newPassword=this.form.value.newPassword!;
    this.auth.changePassword(this.payload).subscribe({
      next:()=>{
        console.log("change password successful");
        // alert("Password changed successfully!");
        this.router.navigate(['/signin'], { queryParams: { passwordChanged: 'success' } });

      },
      error:(err)=>{
        console.log("error", err);
      }
    })
    

  }
}

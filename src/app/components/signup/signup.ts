import { Component } from '@angular/core';
import { userDetails } from '../../models/userDetails';
import { UserRole } from '../../enums/user-role.enum';
import { FormsModule } from "@angular/forms";
import { AuthService } from '../../services/auth-service';
@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  standalone:true,
  styleUrl: './signup.css',
})
export class Signup {
  constructor(private readonly auth:AuthService){}
  UserRole = UserRole; 
  userDetails:userDetails={
    username:"",
    email:"",
    password:"",
    role :[UserRole.user],
  }
  selectRole(roleSelected: UserRole): void {
  this.userDetails.role = [roleSelected];
}
submit(){
  this.auth.signup(this.userDetails).subscribe({
    
      next:()=> {console.log('Signup successful')}

    ,
    
 error:(error)=>{ console.error('Sign up failed:',error.message);
    }
}
  );
}


}

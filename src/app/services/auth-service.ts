import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { userDetails } from '../models/userDetails';
import { user } from '../models/user';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http:HttpClient){}
  
  signup(user:userDetails){
   return  this.http.post("http://localhost:8080/api/auth/signup",user)
    .pipe(catchError(this.handleError)
    );
  }
  signin(user:user){
   return  this.http.post("http://localhost:8080/api/auth/signin",user)
    .pipe(
      catchError(this.handleError)
    );
  }
  signout(){
    return this.http.post("http://localhost:8080/api/auth/signout",null)
    .pipe(
      catchError(this.handleError)
    );
    
  }
  private handleError(error:HttpErrorResponse){
    let message='Something went wrong';
    if(error.error instanceof ErrorEvent){
      //cient side error
      message=error.error.message;
    }else{
      //backend error
      message=error.error?.message || 'Error ${error.status}';
    }
    console.error('Auth error:',message);
    return throwError(()=>new Error(message));
  }
}
